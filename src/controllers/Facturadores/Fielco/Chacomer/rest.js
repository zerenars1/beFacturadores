const axios = require('axios');
const obtenerToken = require('../obtenerToken');
const { validarPago, getMessageError } = require('../operaciones');
const { formateadorRespuesta } = require('./formateadorRespuesta');
const { consultaServices } = require('../../../../services/index');
const { buildTicketBody } = require('../../../Operaciones/ticketCustom.controllers');

/**
 * Este servicio requiere un buscador personalizado trae mas datos que los demas
 * */
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
      data: { items: { nroDocumento: params.body.referencia } },
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
                  xtitulo = xtitulo
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/ /g, '_')
                    .replace('.', '')
                    .toLowerCase();
                  datoAdicional[xtitulo] = itemLevel3.valor;
                }
              }
            });
            nroCuota++;
            data.cuotas.push({ nroCuota, datoRequerido, datoAdicional });
          }
        });
      }

      if (itemLevel1.visible && itemLevel1.tipo === 'StringField') {
        const xtitle = itemLevel1.titulo
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/ /g, '_')
          .toLowerCase();
        if (itemLevel1.titulo) data.items[xtitle] = itemLevel1.valor;
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
    return {
      success: false,
      message: error.message || 'Error al realizar la consulta',
    };
  }
};

async function pago(params) {
  try {
    const txPadre = await consultaServices.getTransaccionPadre(params.transaccion_padre_id);
    const respuestaFacturador = txPadre.dataValues.respuesta_facturador.respuesta_facturador;
    const { numero_cuota, fecha_vencimiento } = params.body;

    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'X-RshkMichi-ApiKey': params.facturador.api_key,
      'X-RshkMichi-AccessToken': respuestaFacturador.accessToken,
      'PS-operacion-code': params.facturador.codServicio,
    };

    const cuota = respuestaFacturador.cuotas.find((item) => item.nroCuota === numero_cuota);
    const { importe_total_acumulado, monto_recibido } = params.body;

    let monto = importe_total_acumulado;
    if (monto_recibido < importe_total_acumulado) {
      monto = monto_recibido;
    }

    const data = {
      items: {
        ...cuota.datoRequerido,
        monto
      },
      info: respuestaFacturador.info
    };

    const resValidar = await validarPago(params, headers, data);
    if (importe_total_acumulado !== resValidar.data.monto) throw new Error('Error el validar monto de pago');

    const resPago = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      headers,
      data,
      timeout: params.facturador.time_out,
    });

    const ticket = await buildTicketBody({
      transaccionPadreId: params.transaccion_padre_id,
      fechaVencimiento: fecha_vencimiento,
      referenciaString: 'NRO. DOCUMENTO',
      referencia: params.body.referencia,
    });

    return {
      success: true,
      message: `Éxito, referencia pago: ${resPago.data.referenciaPago}`,
      data: {
        ticket,
        referencia: resPago.data.referenciaPago,
        transaccionFacturador: resPago.data.movimientoId,
        response: resPago.data
      },
    };
  } catch (error) {
    return getMessageError(error);
  }
}

module.exports = {
  pago,
  consulta
};
