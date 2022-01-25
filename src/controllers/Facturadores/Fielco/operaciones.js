const axios = require('axios');

const buscar = async (params, token, data) => {
  try {
    const result = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host),
      method: params.facturador.metodo,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-RshkMichi-ApiKey': params.facturador.api_key,
        'X-RshkMichi-AccessToken': token.data.accessToken,
        'PS-operacion-code': params.facturador.codServicio,
      },
      data,
      timeout: params.facturador.time_out,
    });

    const dataFacturador = {
      items: {},
      cuotas: [],
      info: result.data.info,
      accessToken: token.data.accessToken
    };

    // estraer los datos requeridos de la respuesta
    // level 1 (highest)
    result.data.items.forEach((itemLevel1) => {
      if (itemLevel1.required) {
        if (itemLevel1.nombre) dataFacturador.items[itemLevel1.nombre] = itemLevel1.valor;

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
            dataFacturador.cuotas.push({ nroCuota, datoRequerido, datoAdicional });
          }
        });
      }
    });

    return dataFacturador;
  } catch (error) {
    if (error.isAxiosError && typeof error.response !== 'undefined') {
      if (error.response.data.code === 'PS-D-00') {
        throw new Error(error.response.data.message);
      }
      if (error.response.data.code === 'a1100') {
        throw new Error('token facturador vencido, vuelva a realizar la consulta');
      }
      if (error.response.status === 400) {
        throw new Error('El facturador rechazo la solicitud de consulta, token vencido');
      }
      if (error.response.status === 500) {
        throw new Error('Error interno del facturador al consultar');
      }
    }
    throw new Error(error.message);
  }
};

async function validarPago(params, headers, data) {
  try {
    const resultValidar = await axios({
      url: params.facturador.protocolo.concat(params.facturador.host_validacion),
      method: params.facturador.metodo,
      headers,
      data,
      timeout: params.facturador.time_out
    });
    return resultValidar;
  } catch (error) {
    if (error.isAxiosError && typeof error.response !== 'undefined') {
      if (error.config.code === 'ECONNABORTED') {
        throw new Error('El facturador no respondio la solicitud de validar el pago');
      }
      if (error.response.status === 400) {
        if (error.response.data.code === 'PS-D-00') throw new Error(error.response.data.message);
        throw new Error('El facturador rechazo la solicitud de validar el pago, token vencido');
      }
      if (error.response.status === 500) {
        throw new Error('Error interno del facturador al validar pago');
      }
    }
    throw new Error(`Validar pago; ${error.message}`);
  }
}

/**
 * Manejador standard para mensajes de error de fielco
 * @param error objeto error del metodo de pago o consulta
*/
function getMessageError(error) {
  if (error.response) {
    return {
      success: false,
      message: error.response.data.message,
      data: { response: error.response.data }
    };
  }
  if (error.request) {
    return {
      success: false,
      message: `Error de conexion con el facturador; ${error.message}`
    };
  }
  return { success: false, message: error.message || 'Error al realizar la operacion' };
}

module.exports = { buscar, validarPago, getMessageError };
