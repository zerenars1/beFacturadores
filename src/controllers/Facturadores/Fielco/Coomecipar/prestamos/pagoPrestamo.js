const axios = require('axios');
const moment = require('moment');
const obtenerToken = require('../../obtenerToken');
const { formateadorRespuesta } = require('./formateadorRespuestaPrestamos');
const { consultaServices } = require('../../../../../services/index');
const { buildTicketBody } = require('../../../../Operaciones/ticketCustom.controllers');

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
      data: {
        items: {
          fi0_1 : 1,
          fi0_2 : params.body.referencia
        }
      },
      timeout: params.facturador.time_out,
    });


    
    const data = {
      items: {},
      cuotas: [],
      info: result.data.info,
      accessToken: token.data.accessToken
    };

    // level 1 (highest)
    result.data.items.forEach((itemLevel1) => {
      if (itemLevel1.required) {
        if (itemLevel1.nombre) data.items[itemLevel1.nombre] = itemLevel1.valor;

        // level 2
        let HeaderField;
        let nroCuota = 0;
        itemLevel1.grupoCampos.forEach((itemLevel2) => {
          if (itemLevel2.tipo === 'HeaderField') {
            HeaderField = itemLevel2.grupoCampos;
          }

          if (itemLevel2.tipo === 'RowField') {
            // level 3
            const datoRequerido = {};
            const datoAdicional = {};
            itemLevel2.grupoCampos.forEach((itemLevel3, index) => {
              if (itemLevel3.nombre && itemLevel3.valor) {
                datoRequerido[itemLevel3.nombre] = itemLevel3.valor;
              } else {
                let xtitulo = HeaderField[index].titulo;
                if (xtitulo !== 'null') {
                  xtitulo = xtitulo.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                  xtitulo = xtitulo.replace(' ', '_').toLowerCase();
                  datoAdicional[xtitulo] = itemLevel3.valor;
                }
              }
            });
            nroCuota++;
            data.cuotas.push({ nroCuota, datoRequerido, datoAdicional });
          }
        });
      }
    });

    return data;
  } catch (error) {
    if (error.isAxiosError && typeof error.response !== 'undefined') {
      if (error.response.data.code === 'PS-D-00') {
        throw new Error(error.response.data.message);
      }

      if (error.response.data.code === 'a1100') {
        throw new Error('token facturador vencido, vuelva a realizar la consulta');
      }
    }
    throw new Error(error.message);
  }
};

const consulta = async (params) => {
  try {
    const busqueda = await buscar(params);
    return formateadorRespuesta(busqueda, params.body, params.transaccion_id);
  } catch (error) {
    console.log(error);
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

    const strFechaVencimiento = moment(fechaVencimiento, 'DD-MM-YYYY').format('YYYY-MM-DD');
    if (!moment(fecha_vencimiento).isSame(strFechaVencimiento)) throw new Error('Las fechas de vto. no coinciden');
  } catch (error) {
    if (error.isAxiosError && typeof error.response !== 'undefined') {
      if (error.config.code === 'ECONNABORTED') {
        throw new Error('El facturador no respondio la solicitud de validar el pago');
      }
      if (error.response.status === 400) {
        throw new Error('El facturador rechazo la solicitud de validar el pago, token vencido');
      }
    }
    throw new Error(`Validar pago; ${error.message}`);
  }
}

async function pago(params) {
  const transaccionPadre = await consultaServices.getTransaccionPadre(params.transaccion_padre_id);
  const { numero_cuota, fecha_vencimiento } = params.body;
  const respuestaFacturador = transaccionPadre.dataValues.respuesta_facturador.respuesta_facturador;

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'X-RshkMichi-ApiKey': params.facturador.api_key,
    'X-RshkMichi-AccessToken': respuestaFacturador.accessToken,
    'PS-operacion-code': params.facturador.codServicio,
  };

  const cuota = respuestaFacturador.cuotas.find((item) => item.nroCuota === numero_cuota);
  const data = {
    items: {
      fi0_1: 1,
      fi0_2 : params.body.referencia,
      ...cuota.datoRequerido
    },
    info: respuestaFacturador.info
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
    

    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      fechaVencimiento: fecha_vencimiento,
      referenciaString: 'NRO_DOCUMENTO',
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

module.exports = {
  pago,
  consulta
};