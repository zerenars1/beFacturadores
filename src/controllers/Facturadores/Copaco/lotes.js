const parser = require('xml2json');
const axios = require('axios');
const moment = require('moment');
const {facturador_parametro} = require('../../../models')
const parserOptions = {
    object: false,
    reversible: false,
    coerce: false,
    sanitize: true,
    trim: true,
    arrayNotation: false,
    alternateTextNode: false,
  };

const buildXMLAbrirLote = (params) => {
    const soap = `<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:cop="http://copaco.boss.soap/">
    <soapenv:Header/>
    <soapenv:Body>
    <cop:abrirLote>
    <codBocaCobranza>${params.codBocaCobranza}</codBocaCobranza>
    <codAutenticacion>${params.codAutenticacion}</codAutenticacion>
    </cop:abrirLote>
    </soapenv:Body>
    </soapenv:Envelope>`

    return soap;
}


function transformAbrirLoteJSON(json) {
    return (
      JSON.parse(
        json
          .replace('S:Envelope', 'raiz')
          .replace('S:Body', 'body')
          .replace('ns2:abrirLoteResponse', 'response')
          .replace('return', 'respuesta')
      ).raiz.body.response.respuesta || []
    );
  }



async function abrirLote(params) {
    try {
        const parametro = {
            codBocaCobranza: params.facturador.usuario,
            codAutenticacion: params.facturador.password
        }
        
        const xml = buildXMLAbrirLote(parametro);
        const result = await axios({
            url: params.facturador.protocolo.concat(params.facturador.host),
            method: params.facturador.metodo,
            headers: {
                'Content-Type': 'text/xml; charset=UTF-8',
                'Accept-Encoding': 'deflate',
                'Content-Length': xml.length,
              },
              timeout: params.facturador.time_out,
              data: xml,

        })
        if (result.status === 200) {
            let json = parser.toJson(result.data, parserOptions);
            json = transformAbrirLoteJSON(json);
            json.originalResponse = result.data;    
            
            await facturador_parametro.update(
              {
                codigo_lote: json.codLote,
                fecha_apertura_lote: moment().format('YYYY-MM-DD HH:mm')
              },
              {
                where: { facturador_id: params.body.facturador_id },
                returning: true,
                plain: true,
              }
            );

            return json;
          }
        
    } catch (error) {
        throw new Error(error);
        
    }

}

module.exports = {
    abrirLote,
  };
  