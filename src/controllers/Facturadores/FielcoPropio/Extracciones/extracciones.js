const moment = require('moment');
const axios = require('axios');
const obtenerToken = require('../../Fielco/obtenerToken');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { consultaServices } = require('../../../../services/index');
const { buildTicketBody } = require('../../../Operaciones/ticketCustom.controllers');

async function consultarCuenta(params, token, refs) {
  try {
    const { numeroDocumento: nroDoc, numeroCelular: telefonoCelular } = refs;
    const fechaNacimiento = moment(refs.fechaNacimiento, 'DD/MM/YYYY').format('YYYYMMDD');

    const res = await axios.get(params.facturador.protocolo.concat(params.facturador.host), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey': params.facturador.api_key,
        'X-RshkMichi-AccessToken': token.data.accessToken,
      },
      params: { codPais: 1, codTipoDoc: 1, nroDoc, fechaNacimiento, telefonoCelular }
    });

    return res;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message === null ? 'Error interno, verifique los datos ingresados' : error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
}

async function controlExtraccion(params, token, data) {
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
    if (error.response) {
      throw new Error(error.response.data.message === null ? 'Error interno, verifique los datos ingresados' : error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
}
async function consulta(params) {
  try {
    const token = await obtenerToken(params);
    const refs = JSON.parse(params.body.referencia).reduce((acc, item) => ({ ...acc, ...item }));
    const {
      numeroDocumento,
      fechaNacimiento,
      numeroCelular,
      numeroCuenta,
      montoExtraccion } = refs;


    // consultar cuenta cliente y validar que sea cuenta en GS
    const respCuentas = await consultarCuenta(params, token, refs);
    if (respCuentas.data.cuentas.length === 0) {
      return { success: false, message: respCuentas.data.mensajeAviso };
    }
    const cuenta = respCuentas.data.cuentas
      .filter((item) => item.numeroCuenta === Number(numeroCuenta));
    if (cuenta.length === 0) {
      return { success: false, message: 'No se encontro el numero de cuenta ingresado' };
    }
    if (cuenta[0].moneda.nombre !== 'Guarani') {
      return {
        success: false,
        message: 'Solo se aceptan cuentas en Guaranies'
      };
    }

    // estructurar parametros
    const data = {
      codigoPais: 1,
      codigoTipoDocumento: 1,
      cuenta: cuenta[0],
      fechaNacimiento,
      firmaCoincide: true,
      montoExtraccion,
      numeroCelular,
      numeroDocumento,
      txToken: respCuentas.data.txToken
    };

    // control extraccion
    const extraccion = await controlExtraccion(params, token, data);
    console.log(extraccion.data);
    if (extraccion.data?.code === 'ext2004') {
      return { success: false, message: 'Cuenta con Saldo Insuficiente p/ el debito' };
    }
    if (extraccion.data?.code === 'ext2008') {
      return { success: false, message: 'El facturador reporto un error interno' };
    }
    if (extraccion.data?.code === 'g1050' || extraccion.data?.code === 'g1000') {
      return { success: false, message: 'Datos enviados incorrectos' };
    }
    if (extraccion.data?.permiteOperar === false) {
      return { success: false, message: 'La cuenta no tiene permitido operar' };
    }

    return formateadorRespuesta({
      ...respCuentas.data,
      extraccion: {
        ...data,
        response: extraccion.data
      },
      accessToken: token.data.accessToken
    }, params.body, params.transaccion_id);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message || 'Error en la consulta',
      data: {},
      error
    };
  }
}

function getTicketBody({ cuenta }, movimientoId) {
  const texto = `
  Mov. ID: ${movimientoId}\n
  Cta. N°.: ${cuenta.numeroCuenta}\n
  Moneda: ${cuenta.moneda.nombrePlural}`;
  return texto;
}

function getTicketFooter() {
  return 'Firma:...............................\n\nAclaración:..........................\n\n';
}

async function pago(params) {
  try {
    const trxPadre = await consultaServices.getTransaccionPadre(params.transaccion_padre_id);
    const respuestaFacturador = trxPadre.dataValues.respuesta_facturador.respuesta_facturador;
    const { txToken } = respuestaFacturador.extraccion.response;

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
      params: { ref: params.transaccion_id },
      data: { pinExtraccion: params.body.pinExtraccion },
      timeout: params.facturador.time_out,
    });
    if (resultPago.data.estado === 'ERROR') {
      return {
        success: false,
        message: 'La operacion no pudo realizarse',
        data: {
          response: resultPago.data
        },
      };
    }

    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      referenciaString: 'NRO. DOCUMENTO',
      referencia: params.body.referencia,
      texto: getTicketBody(respuestaFacturador.extraccion, resultPago.data.movimientoId)
    });

    return {
      success: true,
      message: `Extracción exitosa, Movimiento ID. ${resultPago.data.movimientoId}`,
      data: {
        ticket,
        ticketFooter: getTicketFooter(),
        referencia: '',
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
    const { txToken } = respuestaFacturador.extraccion.response;

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
