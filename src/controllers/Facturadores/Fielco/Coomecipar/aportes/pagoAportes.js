const axios = require('axios');
const obtenerToken = require('../../obtenerToken');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { consultaServices } = require('../../../../../services/index');
const { buscar, validarPago, getMessageError } = require('../../operaciones');
const { buildTicketBody } = require('../../../../Operaciones/ticketCustom.controllers');

const consulta = async (params) => {
  try {
    const token = await obtenerToken(params);
    const refs = JSON.parse(params.body.referencia).reduce((acc, item) => ({ ...acc, ...item }));
    const data = {
      items: {
        fi0_1: refs.tipo_doc,
        fi0_2: refs.nro_ci_socio,
      },
    };
    const busqueda = await buscar(params, token, data);
    return formateadorRespuesta(busqueda, params.body, params.transaccion_id);
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error realizar consulta',
    };
  }
};

async function pago(params) {
  try {
    const txPadre = await consultaServices.getTransaccionPadre(params.transaccion_padre_id);
    const respuestaFacturador = txPadre.dataValues.respuesta_facturador.respuesta_facturador;
    const { numero_cuota, fecha_vencimiento } = params.body;

    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'X-RshkMichi-ApiKey': params.facturador.api_key,
      'X-RshkMichi-AccessToken': respuestaFacturador.accessToken,
      'PS-operacion-code': params.facturador.codServicio,
    };

    const cuota = respuestaFacturador.cuotas.find((item) => item.nroCuota === numero_cuota);
    const { importe_total_acumulado, monto_recibido } = params.body;

    if (monto_recibido < importe_total_acumulado) {
      throw new Error('No se admite monto menor a la deuda');
    }

    const data = {
      items: {
        ...respuestaFacturador.items,
        ...cuota.datoRequerido,
      },
      info: respuestaFacturador.info,
    };

    const resValidar = await validarPago(params, headers, data);
    if (importe_total_acumulado !== resValidar.data.monto) {
      throw new Error('Error el validar monto de pago');
    }

    const resPago = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      headers,
      data,
      timeout: params.facturador.time_out,
    });

    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      fechaVencimiento: fecha_vencimiento,
      referenciaString: 'NRO. CI/SOCIO',
      referencia: params.body.referencia,
    });

    return {
      success: true,
      message: `Éxito, referencia pago: ${resPago.data.referenciaPago}`,
      data: {
        ticket,
        referencia: resPago.data.referenciaPago,
        transaccionFacturador: resPago.data.movimientoId,
        response: resPago.data,
      },
    };
  } catch (error) {
    return getMessageError(error);
  }
}
module.exports = {
  pago,
  consulta,
};
