const axios = require('axios');
const obtenerToken = require('../../Fielco/obtenerToken');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { consultaServices } = require('../../../../services/index');
const { buildTicketBody } = require('../../../Operaciones/ticketCustom.controllers');

async function consultarCuenta(params, token) {
  try {
    const { numeroDocumentoTitular } = JSON.parse(params.body.referencia)
      .find((item) => item.numeroDocumentoTitular);
    const codPais = 1;
    const codTipoDoc = 1;
    const nroDoc = numeroDocumentoTitular;
    const tipoDoc = 1;

    const res = await axios.get(params.facturador.protocolo.concat(params.facturador.host), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey': params.facturador.api_key,
        'X-RshkMichi-AccessToken': token.data.accessToken,
      },
      params: { codPais, codTipoDoc, nroDoc, tipoDoc }
    });

    return res;
  } catch (error) {
    let message;
    if (error.isAxiosError && typeof error.response !== 'undefined') {
      message = error.response.data.message;
    } else {
      message = error.message;
    }
    throw new Error(message);
  }
}

async function controlDeposito(params, token, data) {
  try {
    const resp = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host_validacion),
      method: params.facturador.metodo,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey': params.facturador.api_key,
        'X-RshkMichi-AccessToken': token.data.accessToken
      },
      data,
      timeout: params.facturador.time_out,
    });

    return resp;
  } catch (error) {
    let message;
    if (error.isAxiosError && typeof error.response !== 'undefined') {
      message = error.response.data.message;
    } else {
      message = error.message;
    }
    throw new Error(message);
  }
}

async function consulta(params) {
  try {
    const token = await obtenerToken(params);

    // consultar cuenta cliente
    const respCuentas = await consultarCuenta(params, token);
    if (respCuentas.data.cuentas.length === 0) {
      return { success: false, message: respCuentas.data.mensajeAviso };
    }

    // estructurar parametros
    const refs = JSON.parse(params.body.referencia).reduce((acc, item) => ({ ...acc, ...item }));
    const {
      numeroDocumentoTitular,
      numeroCuenta,
      monto,
      nombreDepositante,
      numeroDocumentoDepositante } = refs;
    const cuentaSubcuenta = respCuentas.data.cuentas
      .filter((item) => item.numeroCuenta === Number(numeroCuenta));
    // validar cuenta del cliente
    if (cuentaSubcuenta.length === 0) {
      return { success: false, message: 'Numero de cuenta no encontado' };
    }
    if (cuentaSubcuenta[0].moneda.nombre !== 'Guarani') {
      return {
        success: false,
        message: 'Solo se aceptan cuentas en Guaranies'
      };
    }

    const data = {
      codigoPaisDepositante: 1,
      codigoPaisTitular: 1,
      codigoTipoDocumentoDepositante: 1,
      codigoTipoDocumentoTitular: 1,
      cuentaSubcuenta: cuentaSubcuenta[0],
      monto,
      nombreDepositante,
      numeroDocumentoDepositante,
      numeroDocumentoTitular
    };

    // control deposito
    const deposito = await controlDeposito(params, token, data);
    if (deposito.data?.bloqueaListaNegra) {
      return { success: false, message: 'Numero de cuenta bloqueado' };
    }

    return formateadorRespuesta({
      cuentas: respCuentas.data,
      deposito: {
        ...data,
        response: deposito.data
      },
      accessToken: token.data.accessToken
    }, params.body, params.transaccion_id);
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error en la consulta',
      data: {},
    };
  }
}

function getTicketBody({
  cuentaSubcuenta,
  nombreDepositante,
  numeroDocumentoDepositante
}, movimientoId) {
  const texto = `
  Mov. ID: ${movimientoId}\n
  Cta. ${cuentaSubcuenta.moneda.nombrePlural} N°.: ${cuentaSubcuenta.numeroCuenta}\n
  Depositante N°. de Doc.: ${numeroDocumentoDepositante}\n
  Depositante: ${nombreDepositante}`;
  return texto;
}

function getTicketFooter() {
  return 'Firma:...............................\n\nAclaración:..........................\n\n';
}

async function pago(params) {
  try {
    const trxPadre = await consultaServices.getTransaccionPadre(params.transaccion_padre_id);
    const respuestaFacturador = trxPadre.dataValues.respuesta_facturador.respuesta_facturador;
    const { txToken } = respuestaFacturador.deposito.response;

    const { importe_total_acumulado, monto_recibido } = params.body;
    if (importe_total_acumulado < Number(monto_recibido)) {
      throw new Error(`El importe debe ser mayor o igual a ${importe_total_acumulado}, importe recibido: ${monto_recibido}`);
    }

    const resultPago = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host.replace(':txToken', txToken)),
      method: params.facturador.metodo,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey': params.facturador.api_key,
        'X-RshkMichi-AccessToken': respuestaFacturador.accessToken
      },
      data: {},
      timeout: params.facturador.time_out,
    });
    if (resultPago.data.estado === 'ERROR') {
      return {
        success: false,
        message: resultPago.data.mensaje,
        data: {
          response: resultPago.data
        },
      };
    }
    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      referenciaString: 'NRO. DOCUMENTO',
      referencia: params.body.referencia,
      texto: getTicketBody(respuestaFacturador.deposito, resultPago.data.movimientoId)
    });

    return {
      success: true,
      message: `Éxito, Movimiento ID: ${resultPago.data.movimientoId}`,
      data: {
        ticket,
        ticketFooter: getTicketFooter(),
        referencia: params.body.referencia,
        transaccionFacturador: resultPago.data.movimientoId,
        response: resultPago.data
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error,
    };
  }
}

async function reversa(params) {
  try {
    const trxPago = await consultaServices.getTransaccionPadre(params.transaccion_padre_id);
    const trxConsulta = await consultaServices.getTransaccionPadre(trxPago.transaccion_padre_id);
    const respuestaFacturador = trxConsulta.dataValues.respuesta_facturador.respuesta_facturador;
    const { txToken } = respuestaFacturador.deposito.response;

    const result = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host.replace(':txToken', txToken)),
      method: params.facturador.metodo,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey': params.facturador.api_key,
        'X-RshkMichi-AccessToken': respuestaFacturador.accessToken
      },
      data: {},
      timeout: params.facturador.time_out,
    });

    if (result.data?.estado === 'OK') {
      return {
        success: true,
        message: result.data.mensaje,
        data: result.data,
      };
    }
    if (result.data?.estado === 'ERROR') {
      return {
        success: false,
        message: 'El facturador no aprobo la reversa',
        data: result.data,
      };
    }
    return {
      success: false,
      message: 'Error al realizar la reversa'
    };
  } catch (e) {
    return {
      success: false,
      message: e.message
    };
  }
}

module.exports = { pago, consulta, reversa };
