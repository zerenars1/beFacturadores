/* eslint-disable no-param-reassign */
const moment = require('moment');
const { deuda, pago, sequelize } = require('../../../models');
const { getDeudas } = require('../../../services/Facturadores/Web/facturadorWeb.services');
const { webServices, responseFormatteServices } = require('../../../services/index');
const { buildTicketBody } = require('../../Operaciones/ticketCustom.controllers');
const { getService } = require('../../../services/Facturadores/servicio.services');

const formatearArrayDeuda = (deuda_array) => {
  // Reasignar nro_operacion como un array para el groupBy
  for (let i = 0; i < deuda_array.length; i++) {
    const nro_operacion = [deuda_array[i].nro_operacion];
    deuda_array[i].nro_operacion = nro_operacion;
  }
};

const operaciones = (deudas) => {
  const operacion = [responseFormatteServices.groupBy(deudas, 'nro_operacion')];
  const { operacionesKey, cantidadDeOperaciones } = responseFormatteServices.operacionesAgrupadas();
  const result = {
    operacion,
    cantidadDeOperaciones,
    key: operacionesKey.filter(responseFormatteServices.distinct),
  };

  return result;
};

module.exports = {
  async consulta(params) {
    try {
      const data = {};
      const result = {
        success: true,
      };

      // #region Obtener Valores de la base de datos
      const deudas = await webServices.getDeudas(params.body.referencia, params.body.servicio_id);

      if (!deudas.length) {
        return { success: false, message: 'El cliente no posee deudas' };
      }

      const servicio = await getService(params.body.servicio_id);
      const medioPago = await webServices.getMediosDePago(params.body.servicio_id);
      const servicioDescripcion = await webServices.getServicioDescripcion(params.body.servicio_id);
      // #endregion

      // #region Cargar cabecera json
      const cabecera = {
        transaccion_id: params.transaccion_id,
        nombre: deudas[0].nombre,
        referencia: params.body.referencia,
        moneda_id: servicio.moneda_id,
        referencia_nombre: servicioDescripcion.nombre,
        medioPago,
        solicitar_factura: false,
      };
      // #endregion

      // #region Armar Detalle json
      formatearArrayDeuda(deudas);

      const { operacion, key, cantidadDeOperaciones } = operaciones(deudas);
      const detalle = [];

      for (let i = 0; i < cantidadDeOperaciones; i++) {
        const cuotas = [];
        operacion[0][key[i]].forEach((element) => {
          cuotas.push({
            numero_cuota: element.cuota_numero,
            fecha_vencimiento: moment(element.fecha_vencimiento).format('YYYY-MM-DD'),
            importe_acumulado: element.importe_acumulado,
            importe_comision: 0,
            importe_comision_acumulado: 0,
            importe_mora_acumulado: element.importe_mora_acumulado,
            importe_total_acumulado: element.importe_acumulado + element.importe_mora_acumulado,
            importe_minimo_acumulado: 0,
          });
        });
        detalle.push({
          operacion: key[i],
          descripcion: 'Pago de cuota',
          cuota: cuotas,
        });
      }

      responseFormatteServices.reiniciarValoresAuxiliares();
      // #endregion

      data.cabecera = cabecera;
      data.detalle = detalle;

      result.data = data;
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async pago(params) {
    const t = await sequelize.transaction();
    let pagoId = 0;
    try {
      const deudas = await getDeudas(params.body.referencia, params.body.servicio_id);
      if (!deudas) {
        return { success: false };
      }

      const deudaAPagar = deudas.filter((a) => a.nro_operacion === params.body.operacion);

      if (!deudaAPagar.length) {
        return {
          success: false,
          message: 'No se pudo obtener la deuda. Número de operación no encontrado',
          data: {},
        };
      }

      let importeTotalAcumulado = params.body.importe_total_acumulado;

      const newPago = await pago.create({
        transaccion_pago_id: params.transaccion_id,
        importe: params.body.importe_total_acumulado,
        importe_mora: params.body.importe_mora_acumulado,
      });

      pagoId = newPago.id;

      const promises = [];
      deudaAPagar.forEach((d) => {
        if (importeTotalAcumulado !== 0) {
          promises.push(
            deuda.update(
              {
                pago_id: newPago.id,
              },
              {
                where: {
                  id: d.id,
                },
                returning: true,
                plain: true,
              },
              { transaction: t }
            )
          );

          importeTotalAcumulado -=
            d.importe + d.importe_mora + params.body.importe_comision_acumulado;
        }
      });

      await Promise.all(promises);

      await t.commit();

      const obj = {
        transaccionPadreId: params.transaccion_padre_id,
        fechaVencimiento: params.body.fecha_vencimiento,
        referenciaString: 'REFERENCIA',
        referencia: params.body.referencia,
      };

      const ticket = await buildTicketBody(obj);

      const result = {
        success: true,
        message: 'Éxito',
        data: {
          ticket,
          referencia: params.body.referencia,
        },
      };
      return result;
    } catch (error) {
      await t.rollback();
      await this.reversaPago(pagoId);
      throw new Error(error);
    }
  },

  async reversaPago(pago_id) {
    try {
      /*
        Por ahora solo se utiliza para anular el pago si el proceso de actualización de deuda falla
        Pensado para time out.
        Este método tiene que estar preparado para anular pagos y deudas pagadas por alguna
        falla en la respuesta.
       */
      await pago.update(
        {
          anulado: true,
        },
        {
          where: {
            id: pago_id,
          },
          returning: true,
          plain: true,
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  },
};
