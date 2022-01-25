const { findParametro } = require('../../../helpers/findParametros');
const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../config/constants');
const { medio_pago } = require('../../../models');
const { getService } = require('../../../services/Facturadores/servicio.services');
const moment = require('moment');
const { responseFormatteServices } = require('../../../services/index');

async function formateadorRespuesta(respuesta, body, transaccion_id) {
  const { referencia, servicio_id } = body;
  try {
    const servicio = await getService(servicio_id);
    const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
    const cabecera = {
      transaccion_id,
      nombre: respuesta.data.data[0].razon_social,
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

    let operaciones = respuesta.data.data;
    let cuotas = [];

    if (operaciones.length > 1) {
      operaciones = responseFormatteServices.groupBy(respuesta.data.data, `id`);

      const cantidadDeOperaciones = Object.keys(operaciones).length;
      const operacionesKey = Object.keys(operaciones);

      const key = operacionesKey.filter(responseFormatteServices.distinct);

      for (let i = 0; i < cantidadDeOperaciones; i++) {
        ordenes = [];
        let numero_cuota = 0;
        operaciones[key[i]].forEach((element) => {
          ordenes.push({
            numero_cuota: ++numero_cuota,
            fecha_vencimiento: moment(element.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            importe_acumulado: parseInt(element.amount),
            importe_comision: 0,
            importe_mora_acumulado: 0,
            importe_comision_acumulado: 0,
            importe_total_acumulado: parseInt(element.amount),
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
        fecha_vencimiento: moment(operaciones[0].date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        importe_acumulado: parseInt(operaciones[0].amount),
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: 0,
        importe_total_acumulado: parseInt(operaciones[0].amount),
        importe_minimo_acumulado: 0,
      });

      detalle.push({
        operacion: parseInt(operaciones[0].id),
        descripcion: 'Pago MiNegocio+',
        cuota: cuotas,
      });
    }

    data.cabecera = cabecera;
    data.detalle = detalle;
    data.respuesta_facturador = respuesta.data;
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
