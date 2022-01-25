const prestamos = require('./Prestamos/prestamos');
const tarjetas = require('./Tarjetas/tarjetas');
const depositos = require('./Depositos/depositos');
const extracciones = require('./Extracciones/extracciones');

const consulta = async (params) => {
  try {
    switch (params.facturador.codServicio) {
      case '01':
        return tarjetas.consulta(params);
      case '02':
        return prestamos.consulta(params);
      case '03':
        return depositos.consulta(params);
      case '04':
        return extracciones.consulta(params);
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
        return tarjetas.pago(params);
      case '02':
        return prestamos.pago(params);
      case '03':
        return depositos.pago(params);
      case '04':
        return extracciones.pago(params);
      default:
        return {
          success: false,
          message: 'No se especifico el codigo de servicio del facturador'
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

const reversa = async (params) => {
  try {
    switch (params.facturador.codServicio) {
      case '01':
        return tarjetas.reversa(params);
      case '02':
        return prestamos.reversa(params);
      case '03':
        return depositos.reversa(params);
      case '04':
        return extracciones.reversa(params);
      default:
        return {
          success: false,
          message: 'No se especifico el codigo de servicio del facturador para la reversa'
        };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error
    };
  }
};

module.exports = { consulta, pago, reversa };
