const axios = require('axios');
const obtenerToken = require('../../obtenerToken');
const { buildTicketBody } = require('../../../../Operaciones/ticketCustom.controllers');

async function validarPago(params, headers, data) {
  try {
    const result = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host_validacion),
      method: params.facturador.metodo,
      headers,
      data,
      timeout: params.facturador.time_out
    });
    return result.data.info;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function pago(params) {
  const token = await obtenerToken(params);

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'X-RshkMichi-ApiKey': params.facturador.api_key,
    'X-RshkMichi-AccessToken': token.data.accessToken,
    'PS-operacion-code': params.facturador.codServicio,
  };

  const data = {
    items: {
      fi0_1: params.body.referencia,
      fi0_2: params.body.importe_acumulado
    }
  };

  try {
    data.info = await validarPago(params, headers, data);
    const resultPago = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      headers,
      data,
      timeout: params.facturador.time_out,
    });

    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      referenciaString: 'NRO. CELULAR',
      referencia: params.body.referencia,
    });

    return {
      success: true,
      message: `Éxito, referencia pago: ${resultPago.data.referenciaPago}`,
      data: {
        ticket,
        referencia: resultPago.data.referenciaPago,
        transaccionFacturador: resultPago.data.movimientoId,
        response: resultPago.data
      }
    };
  } catch (e) {
    if (e.isAxiosError && typeof e.response !== 'undefined') {
      let message;
      switch (e.response.data.code) {
        case 'pagserv0037':
          message = 'El monto a pagar debe ser mayor a cero';
          break;
        case 'g1000':
          message = 'Los datos enviados no son correctos';
          break;
        case 'a1020':
          message = 'Datos de sesion invalidos';
          break;
        case 'a1100':
          message = 'Datos de sesion expirados';
          break;
        default:
          message = `La operacion no pudo realizarse (${e.message})`;
      }
      return {
        success: false,
        message,
        data: {
          response: e.response.data
        }
      };
    }

    return {
      success: false,
      message: `La operacion no pudo realizarse (${e.message})`,
      data: {}
    };
  }
}

module.exports = { pago };
