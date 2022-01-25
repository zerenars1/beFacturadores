const axios = require('axios');
const moment = require('moment');
const obtenerToken = require('../obtenerToken');
const { consultaServices } = require('../../../../services/index');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { buildTicketBody } = require('../../../Operaciones/ticketCustom.controllers');

const buscar = async (params) => {
  try {
    const token = await obtenerToken(params);
    const result = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey': params.facturador.api_key,
        'X-RshkMichi-AccessToken': token.data.accessToken,
        'PS-operacion-code': params.facturador.codServicio,
      },
      data: { items: { fi0_1: params.body.referencia } },
      timeout: params.facturador.time_out,
    });

    const data = {
      items: {},
      cuotas: [],
      info: {},
      token: { accessToken: token.data.accessToken }
    };

    // estraer los datos requeridos de la respuesta
    // level 1 (highest)
    result.data.items.forEach((itemLevel1) => {
      if (itemLevel1.required) {
        if (itemLevel1.nombre) data.items[itemLevel1.nombre] = itemLevel1.valor;
        // level 2
        itemLevel1.grupoCampos.forEach((itemLevel2) => {
          if (itemLevel2.tipo === 'RowField') {
            // level 3
            const row = {};
            itemLevel2.grupoCampos.forEach((itemLevel3) => {
              if (itemLevel3.nombre) row[itemLevel3.nombre] = itemLevel3.valor;
            });
            data.cuotas.push(row);
          }
        });
      }
    });

    data.info = result.data.info;
    if (data.cuotas.length === 0) {
      throw new Error('El abonado no cuenta con cuotas pendientes de pago');
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const consulta = async (params) => {
  try {
    const busqueda = await buscar(params);
    return formateadorRespuesta(busqueda, params.body, params.transaccion_id);
  } catch (error) {
    return {
      success: false,
      data: {},
      message: `No se pudo realizar la consulta solicitada\n${error.message}`,
    };
  }
};

async function validarPago(params, headers, data) {
  const { fecha_vencimiento, importe_acumulado } = params.body;
  try {
    const resultValidar = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host_validacion),
      method: params.facturador.metodo,
      headers,
      data,
      timeout: params.facturador.time_out
    });

    const { deuda, fechaVencimiento } = resultValidar.data;
    if (Number(deuda) !== Number(importe_acumulado)) throw new Error('El importe no es igual a la deuda');

    const strFechaVencimiento = moment(fechaVencimiento, 'DD-MM-YYYY hh:mm A').format('YYYY-MM-DD');
    if (!moment(fecha_vencimiento).isSame(strFechaVencimiento)) throw new Error('Las fechas de vto. no coinciden');
  } catch (e) {
    throw new Error(`Validar pago; ${e.message}`);
  }
}

async function pago(params) {
  const token = await obtenerToken(params);
  const transaccionPadre = await consultaServices.getTransaccionPadre(
    params.transaccion_padre_id
  );
  const { cuotas, info } = transaccionPadre.respuesta.data;
  const { numero_cuota, fecha_vencimiento } = params.body;

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'X-RshkMichi-ApiKey': params.facturador.api_key,
    'X-RshkMichi-AccessToken': token.data.accessToken,
    'PS-operacion-code': params.facturador.codServicio,
  };

  const i = numero_cuota - 1;
  const data = {
    items: {
      fi0_1: params.body.referencia,
      ...cuotas[i]
    },
    info
  };

  try {
    await validarPago(params, headers, data);

    const resultPago = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      headers,
      data,
      timeout: params.facturador.time_out,
    });

    if (resultPago.data.error) {
      throw new Error('Se ha generado un error al validar el pago');
    }

    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      fechaVencimiento: fecha_vencimiento,
      referenciaString: 'CI o NRO.ABONADO',
      referencia: params.body.referencia,
    });

    return {
      success: true,
      message: `Éxito, referencia pago: ${resultPago.data.referenciaPago}`,
      data: {
        ticket,
        referencia: resultPago.data.referenciaPago,
        transaccionFacturador: resultPago.data.movimientoId,
        response: resultPago.data
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `La operacion no pudo realizarse \n${error.message}`,
      data: {},
    };
  }
}

module.exports = { consulta, pago };
