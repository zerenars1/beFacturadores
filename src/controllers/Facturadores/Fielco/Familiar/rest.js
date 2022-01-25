const pagoTargetas = require('./tarjetas/pagoTarjeta');
const pagoPrestamos = require('./prestamos/pagoPrestamo');

async function consulta(params) {
  switch (params.facturador.codServicio) {
    case '798':
      return pagoTargetas.consulta(params);
    case '783':
      return pagoPrestamos.consulta(params);
    default:
      return {
        success: false,
        message: 'No se especifico el codigo de servicio del facturador',
        data: {}
      };
  }
}

async function pago(params) {
  switch (params.facturador.codServicio) {
    case '798':
      return pagoTargetas.pago(params);
    case '783':
      return pagoPrestamos.pago(params);
    default:
      return {
        success: false,
        message: 'No se especifico el codigo de servicio del facturador',
        data: {}
      };
  }
}

module.exports = {
  pago,
  consulta
};
