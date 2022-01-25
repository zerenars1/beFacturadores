const parser = require('xml2json');
const axios = require('axios');
const moment = require('moment');
const { consultaServices } = require('../../../services/index');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const {abrirLote} = require('./lotes')
const { getFacturador } = require('../../../services/Operaciones/consulta.services');
const {getParametroFacturador, getComercioSucursal } = require('../../../services/Operaciones/pago.services')
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
    const soap = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:cop="http://copaco.boss.soap/">
    <soapenv:Header/>
    <soapenv:Body>
    <cop:consultarFactura>
    <p_cuenta>${params.p_cuenta}</p_cuenta>
    <p_telefono>${params.p_telefono}</p_telefono>
    <p_cod_barra>${params.p_cod_barra}</p_cod_barra>
    </cop:consultarFactura>
    </soapenv:Body>
    </soapenv:Envelope>`

    return soap;
}

const buildXMLPago = (params) => {

  const soap = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:cop="http://copaco.boss.soap/">
  <soapenv:Header/>
  <soapenv:Body>
  <cop:registrarPago>
  <p_cuenta>${params.p_cuenta}</p_cuenta>
  <p_importe>${params.p_importe}</p_importe>
  <retIva>${params.retIva}</retIva>
  <retRenta>${params.retRenta}</retRenta>
  <retLey>${params.retLey}</retLey>
  <compRet>${params.compRet}</compRet>
  <retFecha>${params.retFecha}</retFecha>
  <p_fechaPago>${moment(params.p_fechaPago).format('YYYY-MM-DD HH:mm')}</p_fechaPago>
  <p_tp1>${params.p_tp1}</p_tp1>
  <p_tp2>${params.p_tp2}</p_tp2>
  <p_codBocaCobranza>${params.p_codBocaCobranza}</p_codBocaCobranza>
  <p_empresa>${params.p_empresa}</p_empresa>
  <p_codAutenticacion>${params.p_codAutenticacion}</p_codAutenticacion>
  <p_codLotePagos>${params.p_codLotePagos}</p_codLotePagos>
  <p_nroTransaccion>${params.p_nroTransaccion}</p_nroTransaccion>
  <p_terminal>${params.p_terminal}</p_terminal>
  <p_codFactura>${params.p_codFactura}</p_codFactura>
  <p_comentario>${params.p_comentario}</p_comentario>
  </cop:registrarPago>
  </soapenv:Body>
  </soapenv:Envelope>`

  return soap;
}

const buildXMLReversa = (params) => {

  const soap = `<soapenv:Envelope
  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:cop="http://copaco.boss.soap/">
  <soapenv:Header/>
  <soapenv:Body>
  <cop:revertirPago>
  <p_cuenta>${params.p_cuenta}</p_cuenta>
  <p_importe>${params.p_importe}</p_importe>
  <p_fechaPago>${params.p_fechaPago}</p_fechaPago>
  <p_codBocaCobranza>${params.p_codBocaCobranza}</p_codBocaCobranza>
  <p_empresa>${params.p_empresa}</p_empresa>
  <p_codAutenticacion>${params.p_codAutenticacion}</p_codAutenticacion>
  <p_codLotePagos>${params.p_codLotePagos}</p_codLotePagos>
  <p_nroTransaccion>${params.p_nroTransaccion}</p_nroTransaccion>
  <p_terminal>${params.p_terminal}</p_terminal>
  <p_codFactura>${params.p_codFactura}</p_codFactura>
  </cop:revertirPago>
  </soapenv:Body>
  </soapenv:Envelope>`

  return soap;

}

function transformConsultaJSON(json) {
    return (
      JSON.parse(
        json
          .replace('S:Envelope', 'raiz')
          .replace('S:Body', 'body')
          .replace('ns2:consultarFacturaResponse', 'response')
          .replace('return', 'respuesta')
      ).raiz.body.response.respuesta || []
    );
  }

function transformPagoJSON(json) {
  return (
    JSON.parse(
      json
        .replace('S:Envelope', 'raiz')
        .replace('S:Body', 'body')
        .replace('ns2:registrarPagoResponse', 'response')
        .replace('return', 'respuesta')
    ).raiz.body.response.respuesta || []
  );
}

function transformReversaJSON(json) {
  return (
    JSON.parse(
      json
        .replace('S:Envelope', 'raiz')
        .replace('S:Body', 'body')
        .replace('ns2:revertirPagoResponse', 'response')
        .replace('return', 'respuesta')
    ).raiz.body.response.respuesta || []
  );
}

async function getNumeroFactura(numero_cuota, transaccion_padre) {
  const {respuesta: {data}} = transaccion_padre;
  const cuotas = data.detalle[0].cuota;
  const numero_cuenta = data.detalle[0].numero_cuenta
  let codigo_factura;
  let comision_iva;
  cuotas.forEach(c => {
    if(c.numero_cuota === numero_cuota){
      codigo_factura = c.codigo_factura
      comision_iva = c.comision_iva
    }
  });
  return {codigo_factura, comision_iva, numero_cuenta};
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

async function consulta(params) {
    try {
      const parametro = {
        p_cuenta: 0,
        p_telefono: params.body.referencia,
        p_cod_barra: 0
      };
  
      const response = await promisePost(
        buildXMLConsulta(parametro),
        transformConsultaJSON,
        params.facturador,
        false
      );
      return formateadorRespuesta(response, params.body, params.transaccion_id);
    } catch (error) {
      return {
        success:false,
        error: error,
        message: error.message,
        data:{}
      }
    }
}


async function pago(params) {

  try {
    const transaccionPadre = await consultaServices.getTransaccionPadre(
      params.transaccion_padre_id
    );
    const {facturador:{ usuario, password}, transaccion_id} = params
    const {id: id_facturador} = await getFacturador(params.body.servicio_id)
    let {codigo_lote, fecha_apertura_lote} = await getParametroFacturador(id_facturador)
    const { codigo_factura, numero_cuenta } = await getNumeroFactura(params.body.numero_cuota, transaccionPadre)
    
    if(!codigo_lote){

      let nuevo_lote = await abrirLote(params);
      codigo_lote = nuevo_lote.codLote;
      fecha_apertura_lote = nuevo_lote.fecha_apertura_lote;
    }
    
    // A p_importe se le resta la comision porque el facturador devuelve por separado en la operacion de consulta.
    // Y requieren que se envie solo el importe que corresponde a ellos (ya que el cliente paga la comision.)
    const parametro = {
      p_cuenta: numero_cuenta,
      p_importe:params.body.importe_total_acumulado - params.body.importe_comision_acumulado,
      retIva:0,
      retRenta:0,
      retLey:0,
      compRet:0,
      compRet:'',
      retFecha:'',
      p_fechaPago: params.facturador.host.includes('produccion') ? moment().format('YYYY-MM-DD HH:mm') : fecha_apertura_lote,
      p_tp1:'PA',
      p_tp2:'01',
      p_codBocaCobranza:usuario,
      p_empresa:'WEPA',
      p_codAutenticacion: password,
      p_codLotePagos: codigo_lote,
      p_nroTransaccion: transaccion_id,
      p_terminal:'001',
      p_codFactura: codigo_factura,
      p_comentario: "",    
    }

    const response = await promisePost(
      buildXMLPago(parametro),
      transformPagoJSON,
      params.facturador
    );

    if (response.codKey === 'REGPOK'){
      const obj = {
        transaccionPadreId: params.transaccion_padre_id,
        fechaVencimiento: params.body.fecha_vencimiento,
        referenciaString: 'Cuenta',
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

    if (response.codKey === 'REGPV05') {
      let nuevo_lote_retry = await abrirLote(params);
      parametro.p_codLotePagos = nuevo_lote_retry.codLote;
      parametro.p_fechaPago = nuevo_lote_retry.fecha_apertura_lote;

      const retry = await promisePost(
        buildXMLPago(parametro),
        transformPagoJSON,
        params.facturador
      );

      if (retry.codKey === 'REGPOK'){
        const obj = {
          transaccionPadreId: params.transaccion_padre_id,
          fechaVencimiento: params.body.fecha_vencimiento,
          referenciaString: 'Cuenta',
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

      return {
        success: false,
        message: retry.dsc,
      }
    }

    return {
      success: false,
      message: response.dsc,
    }
  
    
  } catch (error) {
    return {
      success:false,
      error: error,
      message: error.message,
      data:{}
    }
  }
}

async function reversa(params) {

  try {
    const transaccionPadre = await consultaServices.getTransaccionPadre(
      params.transaccion_padre_id
    );
    const consultaPadre = await consultaServices.getTransaccionPadre(transaccionPadre.transaccion_padre_id);
    const {id: id_facturador} = await getFacturador(params.body.servicio_id)
    let {codigo_lote, fecha_apertura_lote} = await getParametroFacturador(id_facturador)
    const {facturador:{ usuario, password}, transaccion_id} = params;
    const { codigo_factura, numero_cuenta } = await getNumeroFactura(params.body.numero_cuota, consultaPadre)

    const parametro = {
      p_cuenta: numero_cuenta,
      p_importe:transaccionPadre.monto - transaccionPadre.comision,
      p_fechaPago: params.facturador.host.includes('produccion') ? moment(transaccionPadre.fecha).format('YYYY-MM-DD HH:mm') : fecha_apertura_lote,
      p_codBocaCobranza:usuario,
      p_empresa:'wepa',
      p_codAutenticacion: password,
      p_codLotePagos: codigo_lote,
      p_nroTransaccion: transaccionPadre.id,
      p_terminal:'001',
      p_codFactura: codigo_factura,   
    }

    const response = await promisePost(
      buildXMLReversa(parametro),
      transformReversaJSON,
      params.facturador
    );

    if(response.level === 'Success') {
      return {
        success: true,
        message: 'Pago cancelado',
        data: {
          referencia: params.body.referencia,
          response: response.data
        },
      };
    }

    return {
      success: false,
      message: response.dsc,
      error:"",
      data: {response},
    };


  } catch (error) {
    return {
      success: false,
      error,
      message: error.message,
      data: {},
    };
  }

}

module.exports = { consulta, pago, reversa };
