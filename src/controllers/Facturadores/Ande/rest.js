/* eslint-disable operator-linebreak */
const axios = require('axios');
const { buildTicketBody } = require('../../Operaciones/ticketCustom.controllers');
const { formateadorRespuesta } = require('./formateadorRespuesta');

async function consulta(params) {
  try {
    console.log(params.facturador.protocolo.concat(params.facturador.host));
    const result = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      params: {
        nis: params.body.referencia,
        usuario: params.facturador.usuario,
        clave: params.facturador.password,
      },
      timeout: params.facturador.time_out,
    });

    return formateadorRespuesta(result.data, params.body, params.transaccion_id);
  } catch (error) {
    throw new Error(error);
  }
}

async function pago(params) {
  try {
    const getAndeResponse = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      params: {
        nis: params.body.referencia,
        monto: params.body.importe_total_acumulado,
        usuario: params.facturador.usuario,
        clave: params.facturador.password,
      },
      timeout: params.facturador.time_out,
    });

    if (getAndeResponse.data.error) {
      return {
        success: false,
        error: getAndeResponse.data.error,
        message:
          getAndeResponse.data.mensaje ||
          getAndeResponse.data.errorValList[0] ||
          getAndeResponse.data.mensajeList[0],
        data: {},
      };
    }

    const obj = {
      transaccionPadreId: params.transaccion_padre_id,
      fechaVencimiento: params.body.fecha_vencimiento,
      referenciaString: 'NIS',
      referencia: params.body.referencia,
    };

    const ticket = await buildTicketBody(obj);

    const result = {
      success: true,
      message: 'Éxito',
      error: '',
      data: {
        ticket,
        referencia: params.body.referencia,
      },
    };

    return result;
  } catch (error) {
    return {
      success: false,
      error,
      message: error.message,
      data: {},
    };
  }
}

module.exports = { consulta, pago };
