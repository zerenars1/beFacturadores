var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const { formateadorRespuesta } = require('./formateadorRespuesta');
const { consultaServices } = require('../../../services/index');
const { buildTicketBody } = require('../../Operaciones/ticketCustom.controllers');

async function promisePost(params, facturador) {
  return new Promise((resolve) => {
    let url = facturador.protocolo.concat(facturador.host);
    let xhr = new XMLHttpRequest();
    xhr.open(facturador.metodo, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let data = params;
    xhr.send(data);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resolve(xhr.responseText);
      }
    };
  });
}

async function consulta(params) {
  try {
    const parametro = `{
        "token": "${params.facturador.api_key}",
        "document_number": "${params.body.referencia}"
    }`;

    const response = await promisePost(parametro, params.facturador);

    const json = JSON.parse(response);
    if (!json.success) {
      return {
        success: false,
        message: `Error-${json.msg}`,
      };
    }
    if (json.orders.length < 1) {
      return {
        success: true,
        message: 'El cliente no posee deudas.',
        data: {},
      };
    }
    return formateadorRespuesta(response, params.body, params.transaccion_id);
  } catch (error) {
    return {
      success: false,
      error: error,
      message: error.message,
      data: {},
    };
  }
}

async function pago(params) {
  try {
    const transaccionPadre = await consultaServices.getTransaccionPadre(
      params.transaccion_padre_id
    );
    const facturador = transaccionPadre.respuesta_facturador.respuesta_facturador.orders;

    let orden = facturador[0];
    if (facturador.length > 1) {
      orden = facturador.find((element) => params.body.operacion == element.id);
    }
    const parametro = `{
          "token": "${params.facturador.api_key}",
          "order_id": ${orden.id},
          "amount": ${orden.amount}
       }`;

    const response = await promisePost(parametro, params.facturador);
    const json = JSON.parse(response);

    if (!json.success) {
      return {
        success: false,
        message: `Error-${json.msg}`,
      };
    }
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
    return {
      success: false,
      error: error,
      message: error.message,
      data: {},
    };
  }
}

async function reversa(params) {
  try {
    const parametro = `{
        "token": "${params.facturador.api_key}",
        "order_id": ${params.body.operacion}
     }`;

    const response = await promisePost(parametro, params.facturador);

    const json = JSON.parse(response);

    if (!json.success) {
      return {
        success: false,
        message: `Error-${json.msg}`,
      };
    }

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
    return {
      success: false,
      error: error,
      message: error.message,
      data: {},
    };
  }
}

module.exports = { consulta, pago, reversa };
