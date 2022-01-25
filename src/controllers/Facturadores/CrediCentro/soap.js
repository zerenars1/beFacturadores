/* eslint-disable consistent-return */
const parser = require('xml2json');
const xml2js = require('xml2js');
const axios = require('axios');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { findParametro } = require('../../../helpers/findParametros');
const { moneda } = require('../../../models');
const { MONEDA_LOCAL } = require('../../../config/constants');

const parserOptions = {
  object: false,
  reversible: false,
  coerce: false,
  sanitize: true,
  trim: true,
  arrayNotation: false,
  alternateTextNode: false,
};

const buldXMLConsulta = (params) => {
  const soap = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://quickstart.samples/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:ObtDeuPrestamo>
            <xsd:redPago>${params.redPago}</xsd:redPago>
            <xsd:codServicio>${params.codServicio}</xsd:codServicio>
            <xsd:tipoTransaccion>${params.tipoTransaccion}</xsd:tipoTransaccion>
            <xsd:usuario>${params.usuario}</xsd:usuario>
            <xsd:password>${params.password}</xsd:password>
            <xsd:nroDocumento>${params.nroDocumento}</xsd:nroDocumento>
            <xsd:moneda>${params.moneda}</xsd:moneda>
        </xsd:ObtDeuPrestamo>
   </soapenv:Body>
   </soapenv:Envelope>`;
  return soap;
};

const buildXMLPago = (params) => {
  const soap = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://quickstart.samples/xsd">
  <soapenv:Header/>
  <soapenv:Body>
     <xsd:CobPrestamo>
        <xsd:redPago>${params.redPago}</xsd:redPago>
        <xsd:codServicio>${params.codServicio}</xsd:codServicio>
        <xsd:tipoTransaccion>${params.tipoTransaccion}</xsd:tipoTransaccion>
        <xsd:usuario>${params.usuario}</xsd:usuario>
        <xsd:password>${params.password}</xsd:password>
        <xsd:nroOperacion>${params.nroOperacion}</xsd:nroOperacion>
        <xsd:nroCuota>${params.nroCuota}</xsd:nroCuota>
        <xsd:importe>${params.importe}</xsd:importe>
        <xsd:moneda>${params.moneda}</xsd:moneda>
        <xsd:codTransaccion>${params.codTransaccion}</xsd:codTransaccion>
        <xsd:tipoPago>${params.tipoPago}</xsd:tipoPago>
        <xsd:codBanco></xsd:codBanco>
        <xsd:nroCheque></xsd:nroCheque>
        <xsd:fechaCheque></xsd:fechaCheque>
     </xsd:CobPrestamo>
  </soapenv:Body>
</soapenv:Envelope>`;
  return soap;
};

function transformConsultaJSON(json) {
  return (
    JSON.parse(
      json
        .replace('soapenv:Envelope', 'raiz')
        .replace('soapenv:Body', 'body')
        .replace('ns:ObtDeuPrestamoResponse', 'respuesta')
        .replace('ns:return', 'return')
    ).raiz.body.respuesta || []
  );
}

function transformPagoJSON(json) {
  return (
    JSON.parse(
      json
        .replace('soapenv:Envelope', 'raiz')
        .replace('soapenv:Body', 'body')
        .replace('ns:CobPrestamoResponse', 'respuesta')
        .replace('ns:return', 'return')
    ).raiz.body.respuesta || []
  );
}

async function promisePost(xml, fnTransform, facturador, soapAction) {
  return new Promise((resolve, reject) => {
    axios({
      method: facturador.metodo,
      url: facturador.protocolo.concat(facturador.host),
      headers: {
        'Content-Type': 'text/xml; charset=UTF-8',
        'Accept-Encoding': 'deflate',
        'User-Agent': 'Test',
        'Content-Length': xml.length,
        soapAction,
      },
      timeout: facturador.time_out,
      data: xml,
    })
      .then((response) => {
        if (response.status === 200) {
          let json = parser.toJson(response.data, parserOptions);
          json = fnTransform(json);
          json.response = `<root> ${json.return} </root>`;
          json.originalResponse = response.data;

          return xml2js.parseString(json.response, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

/*
  Datos de prueba
  '363458'
  '418702'
  '418862'
  '417502'
   41870
*/
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
      params.facturador,
      'urn:ObtDeuPrestamo'
    );

    return formateadorRespuesta(response, params.body.referencia);
  } catch (error) {
    throw new Error(error);
  }
}

async function pago(params) {
  const currency = await findParametro(MONEDA_LOCAL, moneda);
  const importeString = params.body.importe_total_acumulado.toString();
  const parametro = {
    redPago: params.facturador.redPago,
    codServicio: params.facturador.codServicio,
    tipoTransaccion: params.facturador.tipoTransaccion,
    usuario: params.facturador.usuario,
    password: params.facturador.password,
    nroOperacion: params.body.operacion,
    nroCuota: params.body.numero_cuota,
    importe: Number(importeString.padEnd(importeString.length + 2, 0)),
    moneda: currency.id,
    codTransaccion: params.transaccion_id,
    tipoPago: params.body.medio_pago.id,
  };

  let response = await promisePost(
    buildXMLPago(parametro),
    transformPagoJSON,
    params.facturador,
    'urn:CobPrestamo'
  );

  if (response.root.codRetorno[0] !== '000') {
    response = {
      success: false,
      message: response.root.desRetorno[0],
    };
  }

  return response;
}

module.exports = { consulta, pago };
