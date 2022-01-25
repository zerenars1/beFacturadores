/* eslint-disable consistent-return */
const parser = require('xml2json');

const axios = require('axios');
const moment = require('moment');
const { buildTicketBody } = require('../../Operaciones/ticketCustom.controllers');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { mensajeDeError } = require('./errorMesssage');
const { consultaServices } = require('../../../services/index');

const date = new Date();
const fecha = moment(date).format('YYYY-MM-DD');
const hora = moment(date).format('HH:mm:ss');
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
  const soap = `<?xml version="1.0"?>
  <soapenv:Envelope
    xmlns:neg="NegofinWeb"
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
      <neg:wsbasenf.Execute>
        <neg:Nroter>00001</neg:Nroter>
        <neg:Nrotrn>${params.transaccionId}</neg:Nrotrn>
        <neg:Fecpag>${fecha}</neg:Fecpag>
        <neg:Horpag>${hora}</neg:Horpag>
        <neg:Wsdoc>${params.referencia}</neg:Wsdoc>
        <neg:Esta>${params.tipoTransaccion}</neg:Esta>
        <neg:Bfope1></neg:Bfope1>
        <neg:Monto></neg:Monto>
        <neg:Resp></neg:Resp>
        <neg:Wusu>${params.usuario}</neg:Wusu>
        <neg:Wpass>${params.password}</neg:Wpass>
        <neg:Pago></neg:Pago>
        <neg:Com></neg:Com>
        <neg:Pronet></neg:Pronet>
        <neg:Wobse></neg:Wobse>
        <neg:Wcod_ser>${params.codServicio}</neg:Wcod_ser>
      </neg:wsbasenf.Execute>
    </soapenv:Body>
  </soapenv:Envelope>`;
  return soap;
};

const buildXMLPago = (params) => {
  const soap = `<?xml version="1.0"?>
  <soapenv:Envelope
    xmlns:neg="NegofinWeb"
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
      <neg:wsbasenf.Execute>
        <neg:Nroter>00001</neg:Nroter>
        <neg:Nrotrn>${params.transaccionId}</neg:Nrotrn>
        <neg:Fecpag>${fecha}</neg:Fecpag>
        <neg:Horpag>${hora}</neg:Horpag>
        <neg:Wsdoc>${params.referencia}</neg:Wsdoc>
        <neg:Esta>${params.tipoTransaccion}</neg:Esta>
        <neg:Bfope1>${params.operacion}</neg:Bfope1>
        <neg:Monto>${params.monto}</neg:Monto>
        <neg:Resp></neg:Resp>
        <neg:Wusu>${params.usuario}</neg:Wusu>
        <neg:Wpass>${params.password}</neg:Wpass>
        <neg:Pago></neg:Pago>
        <neg:Com></neg:Com>
        <neg:Pronet></neg:Pronet>
        <neg:Wobse></neg:Wobse>
        <neg:Wcod_ser>${params.codServicio}</neg:Wcod_ser>
      </neg:wsbasenf.Execute>
    </soapenv:Body>
  </soapenv:Envelope>`;
  console.log(soap);
  return soap;
};

const buildXMLReversa = (params) => {
  const soap = `<?xml version="1.0"?>
  <soapenv:Envelope
    xmlns:neg="NegofinWeb"
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
      <neg:wsbasenf.Execute>
        <neg:Nroter>00001</neg:Nroter>
        <neg:Nrotrn>${params.transaccionId}</neg:Nrotrn>
        <neg:Fecpag>${fecha}</neg:Fecpag>
        <neg:Horpag>${hora}</neg:Horpag>
        <neg:Wsdoc>${params.referencia}</neg:Wsdoc>
        <neg:Esta>${params.tipoTransaccion}</neg:Esta>
        <neg:Bfope1>${params.operacion}</neg:Bfope1>
        <neg:Monto></neg:Monto>
        <neg:Resp></neg:Resp>
        <neg:Wusu>${params.usuario}</neg:Wusu>
        <neg:Wpass>${params.password}</neg:Wpass>
        <neg:Pago></neg:Pago>
        <neg:Com></neg:Com>
        <neg:Pronet></neg:Pronet>
        <neg:Wobse></neg:Wobse>
        <neg:Wcod_ser>${params.codServicio}</neg:Wcod_ser>
      </neg:wsbasenf.Execute>
    </soapenv:Body>
  </soapenv:Envelope>`;
  console.log(soap);
  return soap;
};

function transformConsultaJSON(json) {
  const dataRespuesta =
    JSON.parse(
      json
        .replace('SOAP-ENV:Envelope', 'raiz')
        .replace('SOAP-ENV:Body', 'body')
        .replace('wsbasenf.ExecuteResponse', 'base')
        .replace('Pronet', 'pronet')
        .replace('pronetSDT2.pronetSDTItem2', 'respuesta')
        .replace('xmlns="NegofinWeb"', '')
    ).raiz.body.base.pronet.respuesta || [];
  const codRespuesta =
    JSON.parse(
      json
        .replace('SOAP-ENV:Envelope', 'raiz')
        .replace('SOAP-ENV:Body', 'body')
        .replace('wsbasenf.ExecuteResponse', 'base')
        .replace('Pronet', 'pronet')
        .replace('Resp', 'codRespuesta')
    ).raiz.body.base.codRespuesta.$t || [];

  const result = {
    ...dataRespuesta,
    codRespuesta,
  };

  return result;
}

function transformPagoJSON(json) {
  const codRespuesta =
    JSON.parse(
      json
        .replace('SOAP-ENV:Envelope', 'raiz')
        .replace('SOAP-ENV:Body', 'body')
        .replace('wsbasenf.ExecuteResponse', 'base')
        .replace('Resp', 'codRespuesta')
    ).raiz.body.base.codRespuesta.$t || [];
  return codRespuesta;
}

function transformReversaJSON(json) {
  const codRespuesta =
    JSON.parse(
      json
        .replace('SOAP-ENV:Envelope', 'raiz')
        .replace('SOAP-ENV:Body', 'body')
        .replace('wsbasenf.ExecuteResponse', 'base')
        .replace('Resp', 'codRespuesta')
    ).raiz.body.base.codRespuesta.$t || [];
  return codRespuesta;
}

async function promisePost(xml, fnTransform, facturador) {
  return new Promise((resolve, reject) => {
    axios({
      method: facturador.metodo,
      url: facturador.protocolo.concat(facturador.host),
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
        const err = JSON.parse(JSON.stringify(error));
        const Error = {
          ...err,
        };
        reject(Error);
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
    const parametro = {
      transaccionId: params.transaccion_id,
      codServicio: params.facturador.codServicio,
      tipoTransaccion: params.facturador.tipoTransaccion,
      usuario: params.facturador.usuario,
      password: params.facturador.password,
      referencia: params.body.referencia,
    };

    const response = await promisePost(
      buldXMLConsulta(parametro),
      transformConsultaJSON,
      params.facturador
    );

    return formateadorRespuesta(response, params);
  } catch (error) {
    throw new Error(error);
  }
}

async function pago(params) {
  const parametro = {
    operacion: params.body.operacion,
    monto: params.body.importe_total_acumulado,
    transaccionId: params.transaccion_id,
    codServicio: params.facturador.codServicio,
    tipoTransaccion: params.facturador.tipoTransaccion,
    usuario: params.facturador.usuario,
    password: params.facturador.password,
    referencia: params.body.referencia,
  };

  const response = await promisePost(buildXMLPago(parametro), transformPagoJSON, params.facturador);

  const res = await mensajeDeError(response);

  const obj = {
    transaccionPadreId: params.transaccion_padre_id,
    referenciaString: 'CI',
    fechaVencimiento: params.body.fecha_vencimiento,
    referencia: params.body.referencia,
  };

  const ticket = await buildTicketBody(obj);
  const result = {
    ...res,
    data: {
      ticket,
      referencia: params.body.referencia,
    },
  };
  return result;
}

async function reversa(params) {
  const transaccionPago = await consultaServices.getTransaccionPadre(params.transaccion_padre_id);
  const transaccionConsulta = await consultaServices.getTransaccionPadre(
    transaccionPago.transaccion_padre_id
  );
  const { operacion } = transaccionConsulta.respuesta.data.detalle[0];
  const parametro = {
    operacion,
    transaccionId: transaccionPago.id,
    codServicio: params.facturador.codServicio,
    tipoTransaccion: params.facturador.tipoTransaccion,
    usuario: params.facturador.usuario,
    password: params.facturador.password,
    referencia: params.body.referencia,
  };

  const response = await promisePost(
    buildXMLReversa(parametro),
    transformReversaJSON,
    params.facturador
  );

  const result = await mensajeDeError(response);

  return result;
}

module.exports = { consulta, pago, reversa };
