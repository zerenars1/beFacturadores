const servicioSinAgrupar = require('./NoAgrupaCuotas/servicioSinAgrupar');
const servicioAgrupado = require('./AgrupaCuotas/servicioAgrupado');

const consulta = async (params) => {
  try {
    switch (params.facturador.codServicio) {
      case '01':
        return servicioSinAgrupar.consulta(params);
      case '02':
        return servicioAgrupado.consulta(params);
      default:
        return {
          success: false,
          message: 'No se especifico el codigo de servicio del facturador',
          data: {}
        };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error,
      data: {}
    };
  }
};

const pago = async (params) => {
  try {
    switch (params.facturador.codServicio) {
      case '01':
        return servicioSinAgrupar.pago(params);
      case '02':
        return servicioAgrupado.pago(params);
      default:
        return {
          success: false,
          message: 'No se especifico el codigo de servicio del facturador',
          data: {}
        };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error,
      data: {}
    };
  }
};

module.exports = { consulta, pago };
