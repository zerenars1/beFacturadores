const moment = require('moment');
const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../../config/constants');
const { findParametro } = require('../../../../helpers/findParametros');
const { medio_pago } = require('../../../../models');

const { getService } = require('../../../../services/Facturadores/servicio.services');

async function formateadorRespuesta(respuesta, body, transaccion_id) {
  try {
    const { referencia, servicio_id } = body;
    const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
    const servicio = await getService(servicio_id);

    const nombre = respuesta.cuotas[0]['tabla:1:descripcion'];

    const data = {};
    const result = {
      success: true,
    };

    const cabecera = {
      transaccion_id,
      nombre,
      referencia,
      referencia_nombre: servicio.consulta_referencia,
      moneda_id: servicio.moneda_id,
      medio_pago: [
        {
          id: efectivo.id,
          nombre: efectivo.nombre,
        },
      ],
      solicitar_factura: false,
    };

    const detalle = [];
    const cuotas = [];

    let nrocuota = 0;

    respuesta.cuotas.forEach((item) => {
      let text;
      const cuota = { vencimiento: '', monto: 0 };
      nrocuota++;
      if (item[`tabla:${nrocuota}:key`] && item[`tabla:${nrocuota}:monto`]) {
        text = (item[`tabla:${nrocuota}:key`]).replace('/\\/g', ' ');
        const strDate = JSON.parse(text).vencimiento;
        cuota.vencimiento = moment(strDate, 'MMM DD, YYYY hh:mm A').format('YYYY-MM-DD');
        cuota.monto = item[`tabla:${nrocuota}:monto`];
      } else {
        throw new Error('No se especifico la fecha de vto de la cuota y/o el monto de la misma');
      }

      cuotas.push({
        numero_cuota: nrocuota,
        fecha_vencimiento: cuota.vencimiento,
        importe_acumulado: Number(cuota.monto),
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: Number(cuota.monto),
        importe_minimo_acumulado: 0,
      });
    });

    detalle.push({
      operacion: '',
      descripcion: 'Pago personal tv',
      cuota: cuotas,
    });

    data.cabecera = cabecera;
    data.detalle = detalle;
    result.data = data;

    data.cuotas = respuesta.cuotas;
    data.info = respuesta.info;
    return result;
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
