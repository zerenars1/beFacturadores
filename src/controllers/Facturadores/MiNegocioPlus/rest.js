const axios = require('axios');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { consultaServices } = require('../../../services/index');
const { buildTicketBody } = require('../../Operaciones/ticketCustom.controllers');

async function promisePost(params, facturador) {
  return new Promise((resolve, reject) => {
    axios({
      method: facturador.metodo,
      url: facturador.protocolo.concat(facturador.host),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${facturador.api_key}`,
      },
      data: params,
      timeout: facturador.time_out,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        const Error = {
          ...error,
        };
        reject(Error);
      });
  });
}

async function consulta(params) {
  try {
    const parametro = {
      condition: 2,
      ruc: params.body.referencia,
    };
    const response = await promisePost(parametro, params.facturador);

    return formateadorRespuesta(response, params.body, params.transaccion_id);
  } catch (error) {
    let message = 'No se pudo realizar la consulta';
    if (error.respose && error.response.data && error.response.data.msg) {
      message = error.response.data.msg;
    }
    return {
      success: false,
      error: error,
      message,
      data: {},
    };
  }
}

function eliminarDiacriticos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

async function pago(params) {
  try {
    const transaccionPadre = await consultaServices.getTransaccionPadre(
      params.transaccion_padre_id
    );
    const facturador = transaccionPadre.respuesta_facturador.respuesta_facturador.data;

    let pago = facturador[0];
    if (facturador.length > 1) {
      pago = facturador.find((element) => params.body.operacion == element.id);
    }
    
    const consultaMedioPago = {
      metodo: 'GET',
      protocolo: params.facturador.protocolo,
      host: params.facturador.host_validacion,
      api_key: params.facturador.api_key,
      timeout: params.facturador.time_out
    }

    const resMedioPago = await promisePost({}, consultaMedioPago);
    let findMedioPago = resMedioPago.data.data.find((element) => eliminarDiacriticos(params.body.medio_pago.nombre.toUpperCase())  == eliminarDiacriticos(element.name.toUpperCase()));

    if (findMedioPago == undefined){
      findMedioPago = resMedioPago.data.data.find((element) => 'EFECTIVO'  == eliminarDiacriticos(element.name.toUpperCase()));
    }

    const parametro = {
      invoice_id: pago.id,
      payment_method_id: findMedioPago.id,
      amount: parseInt(pago.amount),
    };

    await promisePost(parametro, params.facturador);

    const obj = {
      transaccionPadreId: params.transaccion_padre_id,
      fechaVencimiento: params.body.fecha_vencimiento,
      referenciaString: 'Documento',
      referencia: params.body.referencia,
    };
    const ticket = await buildTicketBody(obj);
    const result = {
      success: true,
      message: 'Éxito',
      data: {
        ticket,
        referencia: params.body.referencia,
      },
    };
    return result;
  } catch (error) {
    let message = 'No se pudo realizar el pago';
    if (error.respose && error.response.data && error.response.data.msg) {
      message = error.response.data.msg;
    }
    return {
      success: false,
      error: error,
      message,
      data: {},
    };
  }
}

async function reversa(params) {
  try {
    const parametro = {
      payment_id: params.body.operacion,
    };

    await promisePost(parametro, params.facturador);

    const obj = {
      transaccionPadreId: params.transaccion_padre_id,
      fechaVencimiento: params.body.fecha_vencimiento,
      referenciaString: 'Documento',
      referencia: params.body.referencia,
    };
    const ticket = await buildTicketBody(obj);
    const result = {
      success: true,
      message: 'Pago Cancelado',
      data: {
        ticket,
        referencia: params.body.referencia,
      },
    };
    return result;
  } catch (error) {
    let message = 'No se pudo realizar la reversa';
    if (error.respose && error.response.data && error.response.data.msg) {
      message = error.response.data.msg;
    }
    return {
      success: false,
      error: error,
      message,
      data: {},
    };
  }
}

module.exports = { consulta, pago, reversa };
