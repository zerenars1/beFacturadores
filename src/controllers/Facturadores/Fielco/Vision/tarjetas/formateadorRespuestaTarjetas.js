const moment = require('moment');
const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../../../config/constants');
const { findParametro } = require('../../../../../helpers/findParametros');
const { medio_pago } = require('../../../../../models');
const { getService } = require('../../../../../services/Facturadores/servicio.services');

async function formateadorRespuesta(respuesta, body, transaccion_id) {
  try {
    const { referencia, servicio_id } = body;
    const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
    const servicio = await getService(servicio_id);

    if (respuesta.cuotas.length === 0) {
      return {
        success: false,
        message: 'El cliente no cuenta con cuotas pendientes de pago',
      };
    }

    const cabecera = {
      transaccion_id,
      nombre: '',
      referencia,
      referencia_nombre: servicio.consulta_referencia,
      moneda_id: servicio.moneda_id,
      medio_pago: [{ id: efectivo.id, nombre: efectivo.nombre }],
      solicitar_factura: false,
    };
    const detalle = [];
    const cuotas = [];

    respuesta.cuotas.forEach((item) => {
      const { nroCuota, datoRequerido, datoAdicional } = item;
      const monto = datoRequerido[`tabla:${nroCuota}:monto`];
      const vencimiento = moment(datoAdicional.vencimiento, 'DD/MM/YYYY').format('YYYY-MM-DD');
      cabecera.nombre = datoAdicional.nombre;

      cuotas.push({
        numero_cuota: nroCuota,
        fecha_vencimiento: vencimiento,
        importe_acumulado: Number(monto),
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: Number(monto),
        importe_minimo_acumulado: Number(datoAdicional.pago_minimo),
      });
    });

    detalle.push({
      operacion: '',
      descripcion: 'Pago de Tarjeta',
      cuota: cuotas,
    });

    return {
      success: true,
      message: '',
      data: {
        cabecera,
        detalle,
        respuesta_facturador: respuesta
      }
    };
  } catch (error) {
    return {
      success: false,
      message: `La consulta no pudo realizarse \n${error.message}`,
    };
  }
}

module.exports = {
  formateadorRespuesta
};
