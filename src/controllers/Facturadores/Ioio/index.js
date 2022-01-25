/* eslint-disable consistent-return */
const parser = require('xml2json');
const axios = require('axios');
const { findParametro } = require('../../../helpers/findParametros');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { moneda } = require('../../../models');
const { MONEDA_LOCAL } = require('../../../config/constants');
const { buildTicketBody } = require('../../Operaciones/ticketCustom.controllers');

const parserOptions = {
  object: false,
  reversible: false,
  coerce: false,
  sanitize: true,
  trim: true,
  arrayNotation: false,
  alternateTextNode: false,
};

const buldXMLConsulta = (parametro) => {
  const soap = `
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempurl.org">
   <soap:Header/>
   <soap:Body>
      <tem:consulta>
         <tem:codservicio>${parametro.codServicio}</tem:codservicio>
         <tem:tipotrx>${parametro.tipoTransaccion}</tem:tipotrx>
         <tem:usuario>${parametro.usuario}</tem:usuario>
         <tem:password>${parametro.password}</tem:password>
         <tem:nrodocumento>${parametro.nroDocumento}</tem:nrodocumento>
         <tem:moneda>${parametro.moneda}</tem:moneda>
      </tem:consulta>
   </soap:Body>
</soap:Envelope>`;
  return soap;
};

function transformConsultaJSON(json) {
  return (
    JSON.parse(
      json
        .replace('soap:Envelope', 'raiz')
        .replace('soap:Body', 'body')
        .replace('consultaResponse', 'response')
        .replace('consultaResult', 'respuesta')
    ).raiz.body.response.respuesta || []
  );
}

const buildXMLPago = (parametro) => {
  const soap = `
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempurl.org">
  <soap:Header/>
  <soap:Body>
     <tem:pago>
        <tem:codservicio>${parametro.codServicio}</tem:codservicio>
        <tem:tipotrx>${parametro.tipoTransaccion}</tem:tipotrx>
        <tem:usuario>${parametro.usuario}</tem:usuario>
        <tem:password>${parametro.password}</tem:password>
        <tem:nrodocumento>${parametro.nroDocumento}</tem:nrodocumento>
        <tem:importe>${parametro.importe}</tem:importe>
        <tem:moneda>${parametro.moneda}</tem:moneda>
        <tem:mediopago>${parametro.medioPago}</tem:mediopago>
        <tem:codtransaccion>${parametro.codTransaccion}</tem:codtransaccion>
     </tem:pago>
  </soap:Body>
</soap:Envelope>`;
  return soap;
};

function transformPagoJSON(json) {
  return (
    JSON.parse(
      json
        .replace('soap:Envelope', 'raiz')
        .replace('soap:Body', 'body')
        .replace('pagoResponse', 'respuesta')
        .replace('pagoResult', 'return')
    ).raiz.body.respuesta || []
  );
}

async function promisePost(xml, fnTransform, facturador) {
  return new Promise((resolve, reject) => {
    axios({
      method: facturador.metodo,
      url: facturador.protocolo.concat(facturador.host),
      headers: {
        'Content-Type': 'text/xml; charset=UTF-8',
        'Accept-Encoding': 'deflate',
        'Content-Length': xml.length,
      },
      timeout: facturador.time_out,
      data: xml,
    })
      .then((response) => {
        if (response.status === 200) {
          let json = parser.toJson(response.data, parserOptions);
          json = fnTransform(json);
          json.originalResponse = response.data;

          return resolve(json);
        }
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function consulta(params) {
  try {
    const currency = await findParametro(MONEDA_LOCAL, moneda);

    const parametro = {
      redPago: params.facturador.redPago,
      codServicio: params.facturador.codServicio,
      tipoTransaccion: params.facturador.tipoTransaccion,
      usuario: params.facturador.usuario,
      password: params.facturador.password,
      nroDocumento: params.body.referencia,
      moneda: currency.id,
    };

    const response = await promisePost(
      buldXMLConsulta(parametro),
      transformConsultaJSON,
      params.facturador
    );

    return formateadorRespuesta(response, params.body.referencia);
  } catch (error) {
    throw new Error(error);
  }
}

async function pago(params) {
  const currency = await findParametro(MONEDA_LOCAL, moneda);
  const parametro = {
    redPago: params.facturador.redPago,
    codServicio: params.facturador.codServicio,
    tipoTransaccion: params.facturador.tipoTransaccion,
    usuario: params.facturador.usuario,
    password: params.facturador.password,
    nroDocumento: params.body.referencia,
    nroCuota: params.body.numero_cuota,
    importe: params.body.importe_total_acumulado,
    moneda: currency.id,
    codTransaccion: params.transaccion_id,
    medioPago: params.body.medio_pago.id,
  };

  const response = await promisePost(buildXMLPago(parametro), transformPagoJSON, params.facturador);

  if (response.return.codretorno !== '000') {
    return {
      success: false,
      message: response.return.desretorno,
    };
  }

  const obj = {
    transaccionPadreId: params.transaccion_padre_id,
    fechaVencimiento: params.body.fecha_vencimiento,
    referenciaString: 'Cédula',
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
}

module.exports = { pago, consulta };
