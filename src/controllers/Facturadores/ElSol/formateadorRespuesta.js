const { findParametro } = require('../../../helpers/findParametros');
const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../config/constants');
const { medio_pago } = require('../../../models');
const { getService } = require('../../../services/Facturadores/servicio.services');
const { responseFormatteServices } = require('../../../services/index');
const moment = require('moment');

async function formateadorRespuesta(respuesta, body, transaccion_id) {
  const json = JSON.parse(respuesta);
  const { referencia, servicio_id } = body;
  try {
    const servicio = await getService(servicio_id);
    const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
    const cabecera = {
      transaccion_id,
      nombre:
        json['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:trRet_CabDet'].CAB_NombreContratante.$t,
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

    let operaciones = json['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:TArrayOFDatos'];
    let cuotas = [];
    if (operaciones.length > 1) {
      operaciones = responseFormatteServices.groupByNested(
        json['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:TArrayOFDatos'],
        `DET_Poliza`
      );

      const cantidadDeOperaciones = Object.keys(operaciones).length;
      const operacionesKey = Object.keys(operaciones);

      const key = operacionesKey.filter(responseFormatteServices.distinct);

      for (let i = 0; i < cantidadDeOperaciones; i++) {
        cuotas = [];
        let acumulado = 0;
        operaciones[key[i]].forEach((element) => {
          cuotas.push({
            numero_cuota: parseInt(element.DET_Cuota.$t),
            importe_moneda: parseInt(element.DET_Moneda.$t),
            fecha_vencimiento: moment(element.DET_Vencimiento.$t, 'DDMMYYYY').format('YYYY-MM-DD'),
            importe_acumulado: parseInt(element.DET_TotalDeuda.$t),
            importe_comision: 0,
            importe_comision_acumulado: 0,
            importe_mora_acumulado: element.DET_Mora.$t,
            importe_total_acumulado: parseInt(acumulado),
            importe_minimo_acumulado: 0,
          });
          acumulado = element.DET_TotalDeuda.$t + acumulado;
        });

        detalle.push({
          operacion: parseInt(key[i]),
          descripcion: 'Pago de El Sol Seguro',
          cuota: cuotas,
        });
      }
    } else {
      cuotas.push({
        numero_cuota: parseInt(operaciones.DET_Cuota.$t),
        importe_moneda: parseInt(operaciones.DET_Moneda.$t),
        fecha_vencimiento: moment(operaciones.DET_Vencimiento.$t, 'DDMMYYYY').format('YYYY-MM-DD'),
        importe_acumulado: parseInt(operaciones.DET_TotalDeuda.$t),
        importe_comision: 0,
        importe_comision_acumulado: 0,
        importe_mora_acumulado: operaciones.DET_Mora.$t,
        importe_total_acumulado: parseInt(operaciones.DET_TotalDeuda.$t),
        importe_minimo_acumulado: 0,
      });

      detalle.push({
        operacion: parseInt(operaciones.DET_Poliza.$t),
        descripcion: 'Pago de El Sol Seguro',
        numero_cuenta: respuesta[0].nro_cuenta,
        cuota: cuotas,
      });
    }

    data.cabecera = cabecera;
    data.detalle = detalle;
    data.respuesta_facturador = json;
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
