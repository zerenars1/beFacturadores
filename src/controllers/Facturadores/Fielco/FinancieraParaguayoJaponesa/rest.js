const pagoTarjeta = require('./tarjetas/pagoTarjeta');
const pagoPrestamos = require('./prestamos/pagoPrestamos');

async function consulta(params) {
  switch (params.facturador.codServicio) {
    case '1305':
      return pagoTarjeta.consulta(params);
    case '1101':
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
    case '1305':
      return pagoTarjeta.pago(params);
    case '1101':
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
