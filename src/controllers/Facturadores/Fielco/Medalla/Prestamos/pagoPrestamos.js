const axios = require('axios');
const obtenerToken = require('../../obtenerToken');
const { validarPago, getMessageError } = require('../../operaciones');
const { buildTicketBody } = require('../../../../Operaciones/ticketCustom.controllers');

async function pago(params) {
  try {
    const token = await obtenerToken(params);
    const refs = JSON.parse(params.body.referencia).reduce((acc, item) => ({ ...acc, ...item }));

    const { importe_total_acumulado } = params.body;
    if (importe_total_acumulado !== Number(refs.monto)) {
      throw new Error('El monto de pago no es igual al importe total acumulado');
    }

    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'X-RshkMichi-ApiKey': params.facturador.api_key,
      'X-RshkMichi-AccessToken': token.data.accessToken,
      'PS-operacion-code': params.facturador.codServicio,
    };

    const data = {
      items: {
        fi0_1: refs.nro_cedula,
        fi0_2: refs.nro_prestamo,
        monto: refs.monto
      }
    };

    const resValidarPago = await validarPago(params, headers, data);
    data.info = resValidarPago.data.info;

    const resPago = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      headers,
      data,
      timeout: params.facturador.time_out,
    });

    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      referenciaString: 'NRO. CEDULA',
      referencia: refs.nro_cedula,
    });

    return {
      success: true,
      message: `Éxito, referencia pago: ${resPago.data.referenciaPago}`,
      data: {
        ticket,
        referencia: resPago.data.referenciaPago,
        transaccionFacturador: resPago.data.movimientoId,
        response: resPago.data
      }
    };
  } catch (error) {
    return getMessageError(error);
  }
}
module.exports = { pago };
