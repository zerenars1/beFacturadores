const { MP_MEDIO_EFECTIVO_PARAMETRO } = require('../../../config/constants');
const { findParametro } = require('../../../helpers/findParametros');
const { medio_pago } = require('../../../models');
const { getService } = require('../../../services/Facturadores/servicio.services');
const { getErrorMessage } = require('./errorMessage');

async function formateadorRespuesta(respuesta, body, transaccion_id) {
  try {
    const { servicio_id } = body;
    const efectivo = await findParametro(MP_MEDIO_EFECTIVO_PARAMETRO, medio_pago);
    const servicio = await getService(servicio_id);
    const { nro_cuenta } = JSON.parse(body.referencia).find((item) => item.nro_cuenta);
    const { monto } = JSON.parse(body.referencia).find((item) => item.monto);

    if (typeof respuesta.data.response !== 'undefined') {
      // reponse code 0 = ok
      if (respuesta.data.response.code === 0) {
        const { FirstName, LastName } = respuesta.data.response;
        const cabecera = {
          transaccion_id,
          nombre: (`${FirstName} ${LastName}`).toUpperCase(),
          referencia: nro_cuenta,
          referencia_nombre: servicio.consulta_referencia,
          moneda_id: servicio.moneda_id,
          medio_pago: [{ id: efectivo.id, nombre: efectivo.nombre }],
          solicitar_factura: false,
        };
        const detalle = [];
        const cuotas = [];
        cuotas.push({
          numero_cuota: 0,
          fecha_vencimiento: '',
          importe_acumulado: Number(monto),
          importe_comision: 0,
          importe_comision_acumulado: 0,
          importe_mora_acumulado: 0,
          importe_total_acumulado: Number(monto),
          importe_minimo_acumulado: 0,
        });

        detalle.push({
          operacion: '',
          descripcion: 'Deposito en cuenta',
          cuota: cuotas,
        });

        return {
          success: true,
          message: '',
          data: {
            cabecera,
            detalle,
            respuesta_facturador: respuesta.data
          }
        };
      }
      return {
        success: false,
        message: getErrorMessage(respuesta.data),
        data: respuesta.data,
      };
    }

    throw new Error('La cuenta no pudo ser verificada');
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
