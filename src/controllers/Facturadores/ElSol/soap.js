const parser = require('xml2json');
const axios = require('axios');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { consultaServices } = require('../../../services/index');
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

const buildXMLConsulta = (params) => {
  const soap = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WsConsCobIntf-IWsConsCob">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:Consulta soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <ParamsPed xsi:type="urn:trPedido" xmlns:urn="urn:WsConsCobIntf">
             <CodServicio xsi:type="xsd:string">${params.codServicio}</CodServicio>
             <TipoTrx xsi:type="xsd:int">${params.tipoTRX}</TipoTrx>
             <Usuario xsi:type="xsd:string">${params.user}</Usuario>
             <Clave xsi:type="xsd:string">${params.password}</Clave>
             <TipoDocumento xsi:type="xsd:int">${params.documentType}</TipoDocumento>
             <Documento xsi:type="xsd:string">${params.document}</Documento>
          </ParamsPed>
       </urn:Consulta>
    </soapenv:Body>
 </soapenv:Envelope>`;

  return soap;
};

const buildXMLPago = (params) => {
  const soap = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WsConsCobIntf-IWsConsCob">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:Pago_Anulacion soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <ParamsPed xsi:type="urn:trPedidoPagoAnulacion" xmlns:urn="urn:WsConsCobIntf">
           <CodServicio xsi:type="xsd:string">${params.codServicio}</CodServicio>
           <TipoTrx xsi:type="xsd:int">${params.tipoTRX}</TipoTrx>
           <Usuario xsi:type="xsd:string">${params.user}</Usuario>
           <Clave xsi:type="xsd:string">${params.password}</Clave>
           <Seccion xsi:type="xsd:string">${params.seccion}</Seccion>
           <Poliza xsi:type="xsd:int">${params.poliza}</Poliza>
           <Endoso xsi:type="xsd:int">${params.endoso}</Endoso>
           <Cuota xsi:type="xsd:int">${params.cuota}</Cuota>
           <Moneda xsi:type="xsd:int">${params.moneda}</Moneda>
           <Importe xsi:type="xsd:double">${params.importe}</Importe>
           <CodTransaccion xsi:type="xsd:long">${params.codTransaccion}</CodTransaccion>
        </ParamsPed>
     </urn:Pago_Anulacion>
  </soapenv:Body>
</soapenv:Envelope>`;

  return soap;
};

const buildXMLReversa = (params) => {
  const soap = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WsConsCobIntf-IWsConsCob">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:Pago_Anulacion soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <ParamsPed xsi:type="urn:trPedidoPagoAnulacion" xmlns:urn="urn:WsConsCobIntf">
           <CodServicio xsi:type="xsd:string">${params.codServicio}</CodServicio>
           <TipoTrx xsi:type="xsd:int">${params.tipoTRX}</TipoTrx>
           <Usuario xsi:type="xsd:string">${params.user}</Usuario>
           <Clave xsi:type="xsd:string">${params.password}</Clave>
           <CodTransaccionAnular xsi:type="xsd:long">${params.codTransaccion}</CodTransaccionAnular>
        </ParamsPed>
     </urn:Pago_Anulacion>
  </soapenv:Body>
</soapenv:Envelope>`;

  return soap;
};

async function promisePost(xml, facturador) {
  return new Promise((resolve, reject) => {
    axios({
      method: facturador.metodo,
      url: facturador.protocolo.concat(facturador.host),
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Content-Length': xml.length,
      },
      data: xml,
    })
      .then((response) => {
        let json = parser.toJson(response.data, parserOptions);
        return resolve(json);
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

async function consulta(params) {
  try {
    const parametro = {
      codServicio: params.facturador.codServicio,
      tipoTRX: 5,
      user: params.facturador.usuario,
      password: params.facturador.password,
      documentType: params.body.referencia.includes('-') ? 2 : 1,
      document: params.body.referencia,
    };

    const response = await promisePost(buildXMLConsulta(parametro), params.facturador);

    const json = JSON.parse(response);
    if (
      json['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:trRet_CabDet'].CAB_CodRetorno.$t !== '000'
    ) {
      return {
        success: false,
        message: `Error-${json['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:trRet_CabDet'].CAB_DesRetorno.$t}`,
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
    const facturador =
      transaccionPadre.respuesta_facturador.respuesta_facturador['SOAP-ENV:Envelope'][
        'SOAP-ENV:Body'
      ]['NS2:TArrayOFDatos'];

    let poliza = facturador;
    if (facturador.length > 1) {
      poliza = facturador.find((element) => params.body.operacion == element.DET_Poliza.$t);
    }
    const parametro = {
      codServicio: params.facturador.codServicio,
      tipoTRX: 3,
      user: params.facturador.usuario,
      password: params.facturador.password,
      seccion: poliza.DET_Seccion.$t,
      poliza: parseInt(params.body.operacion),
      endoso: parseInt(poliza.DET_Endoso.$t),
      cuota: parseInt(params.body.numero_cuota),
      moneda: parseInt(params.body.moneda_id),
      importe: parseInt(params.body.importe_acumulado),
      codTransaccion: params.body.transaccion_id,
    };

    const response = await promisePost(buildXMLPago(parametro), params.facturador);
    const json = JSON.parse(response);
    if (json['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:trRespuestaPago'].CodRetorno.$t !== '000') {
      return {
        success: false,
        message: `Error-${json['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:trRespuestaPago'].DesRetorno.$t}`,
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
    const { transaccion_padre_id: codTransaccion } = await consultaServices.getTransaccionPadre(
      params.transaccion_padre_id
    );
    const parametro = {
      codServicio: params.facturador.codServicio,
      tipoTRX: 6,
      user: params.facturador.usuario,
      password: params.facturador.password,
      codTransaccion,
    };

    const response = await promisePost(buildXMLReversa(parametro), params.facturador);

    const json = JSON.parse(response);
    if (json['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:trRespuestaPago'].CodRetorno.$t !== '000') {
      return {
        success: false,
        message: `Error-${json['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:trRespuestaPago'].DesRetorno.$t}`,
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
