const axios = require('axios');
const moment = require('moment');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { buildTicketBody } = require('../../Operaciones/ticketCustom.controllers');
const { consultaServices } = require('../../../services/index');

async function consulta(params) {
  try {
    const result = await axios({
      url: params.facturador.protocolo
        .concat(params.facturador.host)
        .concat(params.body.referencia),
      params: { tipo: params.body.tipo_referencia },
      method: params.facturador.metodo,
      data: {
        usuario: params.facturador.usuario,
        clave: params.facturador.password,
        tipo_consulta: params.facturador.tipoTransaccion,
        id_consulta: params.transaccion_id.toString(),
      },
      timeout: params.facturador.time_out,
    });

    return formateadorRespuesta(result.data, params);
  } catch (error) {
    throw new Error(error);
  }
}

async function pago(params) {
  try {
    const transaccionPadre = await consultaServices.getTransaccionPadre(
      params.transaccion_padre_id
    );
    const idEssap = transaccionPadre.respuesta_facturador.detalle[0].operacion[1];
    const result = await axios({
      url: params.facturador.protocolo
        .concat(params.facturador.host)
        .concat(params.body.referencia),
      params: { tipo: params.body.tipo_referencia },
      method: params.facturador.metodo,
      data: {
        usuario: params.facturador.usuario,
        clave: params.facturador.password,
        tipo_consulta: params.facturador.tipoTransaccion,
        id_essap: idEssap,
        id_consulta: params.transaccion_padre_id,
        cod_pago: params.transaccion_id,
        fecha_real: moment(Date.now()).format('DDMMYYYY'),
        fecha_proceso: moment(Date.now()).format('DDMMYYYY'), // TODO: Verificar los feriados, sabados y domingos para agrupar segun documentacion
      },
      timeout: params.facturador.time_out,
    });

    if (result.data.error) {
      return {
        success: false,
        message: result.data.mensaje || result.data.errorValList[0] || result.data.mensajeList[0],
        data: {},
      };
    }

    const avisos = `${transaccionPadre.respuesta_facturador.cabecera.aviso_princ}. ${transaccionPadre.respuesta_facturador.detalle[0].aviso_sec}`;

    const obj = {
      transaccionPadreId: params.transaccion_padre_id,
      referenciaString: 'ISSAN',
      fechaVencimiento: params.body.fecha_vencimiento,
      referencia: params.body.referencia.toUpperCase(),
      avisos,
    };

    const ticket = await buildTicketBody(obj);

    const response = {
      success: true,
      message: 'Éxito',
      data: {
        ticket,
        referencia: params.body.referencia,
      },
    };

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function reversa(params) {
  try {
    const transaccionPadre = await consultaServices.getTransaccionPadre(
      params.transaccion_padre_id
    );
    const idEssap = transaccionPadre.respuesta_facturador.detalle[0].operacion[1];
    const result = await axios({
      url: params.facturador.protocolo
        .concat(params.facturador.host)
        .concat(params.body.referencia),
      params: { tipo: params.body.tipo_referencia },
      method: params.facturador.metodo,
      data: {
        usuario: params.facturador.usuario,
        clave: params.facturador.password,
        id_essap: idEssap,
        id_consulta: params.transaccion_padre_id,
        cod_pago: params.transaccion_id,
        cod_anulacion: params.transaccion_id,
      },
      timeout: params.facturador.time_out,
    });

    return formateadorRespuesta(result.data, params);
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { consulta, pago, reversa };
