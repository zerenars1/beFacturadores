const pagoTarjeta = require('./tarjetas/pagoTarjetas');
const pagoPrestamos = require('./prestamos/pagoPrestamo');

async function consulta(params) {
  switch (params.facturador.codServicio) {
    case '812':
      return pagoTarjeta.consulta(params);
    case '2116':
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
    case '812':
      return pagoTarjeta.pago(params);
    case '2116':
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
