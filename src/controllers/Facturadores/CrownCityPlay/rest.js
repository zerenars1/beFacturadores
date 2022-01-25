const axios = require('axios');
const { buildTicketBody } = require('../../Operaciones/ticketCustom.controllers');
const { getChekHash, getPayHash, getCancelHash } = require('./getHashCode');
const { getErrorMessage } = require('./errorMessage');
const { getTxnIdByTransaccion } = require('../../../services/Facturadores/CrownCityPlay/crownCityPlay.service');
const { formateadorRespuesta } = require('./formateadorRespuesta');

async function checkClient(params) {
  const { nro_cuenta } = JSON.parse(params.body.referencia).find((item) => item.nro_cuenta);
  const secretKey = params.facturador.password;
  const account = nro_cuenta;
  const command = 'check';
  const currency = 'PYG';
  const sid = '1269';
  const hashcode = getChekHash(command, account, currency, sid, secretKey);

  try {
    const res = await axios.get(params.facturador.protocolo.concat(params.facturador.host), {
      params: { command, account, currency, sid, hashcode }
    });
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function consulta(params) {
  try {
    const respuesta = await checkClient(params);
    return formateadorRespuesta(respuesta, params.body, params.transaccion_id);
  } catch (error) {
    return {
      success: false,
      data: {},
      message: `No se pudo realizar la consulta solicitada\n${error.message}`,
    };
  }
}

async function pago(params) {
  try {
    // obtener el codigo de transaccion del facturador
    const txnIdByTransaccion = await getTxnIdByTransaccion(params.transaccion_id);
    if (txnIdByTransaccion == null) throw new Error('No se pudo obtener el codigo transaccional para crowncity');
    if (txnIdByTransaccion.txn_id === null) throw new Error('El codigo transaccional para crowncity no es valido');

    const secretKey = params.facturador.password;
    const account = params.body.referencia;
    const amount = params.body.importe_acumulado;
    const { txn_id } = txnIdByTransaccion;
    const currency = 'PYG';
    const sid = '1269';
    const command = 'pay';
    const hashcode = getPayHash(command, txn_id, account, amount, currency, sid, secretKey);

    const resultPago = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      params: {
        command,
        account,
        amount,
        currency,
        txn_id,
        sid,
        hashcode
      },
      timeout: params.facturador.time_out,
    });

    console.log(resultPago);
    // response.code === '0', operacion exitosa
    if (typeof resultPago.data.response !== 'undefined') {
      if (resultPago.data.response.code === 0) {
        const ticket = await buildTicketBody({
          transaccionPadreId: params.transaccion_padre_id,
          referenciaString: 'NUMERO CUENTA',
          referencia: params.body.referencia,
        });

        return {
          success: true,
          message: 'Éxito',
          data: {
            ticket,
            referencia: params.body.referencia,
            transaccionFacturador: txn_id,
            response: resultPago.data
          },
        };
      }
    }
    return {
      success: false,
      message: getErrorMessage(resultPago.data),
      data: { params: resultPago.config.params, data: resultPago.data },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error,
    };
  }
}

async function reversa(params) {
  try {
    const txnIdByTransaccion = await getTxnIdByTransaccion(params.transaccion_padre_id);
    if (txnIdByTransaccion == null) throw new Error('No se pudo obtener el codigo transaccional para crowncity');

    const secretKey = params.facturador.password;
    const { txn_id } = txnIdByTransaccion;
    const sid = '1269';
    const command = 'cancel';
    const hashcode = await getCancelHash(command, txn_id, sid, secretKey);

    const result = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      params: { command, txn_id, sid, hashcode },
      timeout: params.facturador.time_out,
    });

    if (result.data) {
      // response.code === 2, operacion cancelada
      if (result.data.response.code === 2) {
        return {
          success: true,
          message: 'Deposito cancelado',
          data: {
            referencia: params.body.referencia,
            response: result.data
          },
        };
      }
    }
    return {
      success: false,
      message: getErrorMessage(result.data),
      data: result.data,
    };
  } catch (e) {
    return {
      success: false,
      message: e.message,
      data: {},
    };
  }
}

module.exports = {
  pago,
  reversa,
  checkClient,
  consulta
};
