const { findParametro } = require('../../../helpers/findParametros');
const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../config/constants');
const { medio_pago } = require('../../../models');
const { getService } = require('../../../services/Facturadores/servicio.services');
const { responseFormatteServices } = require('../../../services/index');

async function formateadorRespuesta(respuesta, body, transaccion_id) {
  try {
    const res = JSON.parse(respuesta);
    const { referencia, servicio_id } = body;
    const servicio = await getService(servicio_id);
    const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
    const cabecera = {
      transaccion_id,
      nombre: res.user.fullname,
      referencia,
      referencia_nombre: '',
      moneda_id: servicio.moneda_id,
      medioPago: [
        {
          id: efectivo.id,
          nombre: efectivo.nombre,
        },
      ],
      solicitar_factura: false,
    };

    const data = {};
    const result = {
      success: true,
    };
    const detalle = [];
    let ordenes = [];

    let operaciones = res.orders;

    if (operaciones.length > 1) {
      operaciones = responseFormatteServices.groupBy(res.orders, `id`);

      const cantidadDeOperaciones = Object.keys(operaciones).length;
      const operacionesKey = Object.keys(operaciones);

      const key = operacionesKey.filter(responseFormatteServices.distinct);

      for (let i = 0; i < cantidadDeOperaciones; i++) {
        ordenes = [];
        let numero_cuota = 0;
        operaciones[key[i]].forEach((element) => {
          ordenes.push({
            numero_cuota: ++numero_cuota,
            importe_moneda: 1,
            fecha_vencimiento: '',
            importe_acumulado: parseInt(element.amount),
            importe_comision: 0,
            importe_mora_acumulado: 0,
            importe_total_acumulado: 0,
            importe_minimo_acumulado: 0,
          });
        });

        detalle.push({
          operacion: parseInt(key[i]),
          descripcion: 'Pago MiNegocio',
          cuota: ordenes,
        });
      }
    } else {
      numero_cuota = 0;
      ordenes.push({
        numero_cuota: ++numero_cuota,
        importe_moneda: 1,
        fecha_vencimiento: '',
        importe_acumulado: parseInt(operaciones[0].amount),
        importe_comision: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: 0,
        importe_minimo_acumulado: 0,
      });

      detalle.push({
        operacion: parseInt(operaciones[0].id),
        descripcion: 'Pago MiNegocio',
        cuota: ordenes,
      });
    }

    data.cabecera = cabecera;
    data.detalle = detalle;
    data.respuesta_facturador = res;
    result.data = data;

    return result;
  } catch (error) {
    return {
      success: false,
      message: `La consulta no pudo realizarse \n${error.message}`,
    };
  }
}

module.exports = {
  formateadorRespuesta,
};
