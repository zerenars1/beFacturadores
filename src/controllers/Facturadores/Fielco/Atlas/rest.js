const pagoTarjetas = require('./tarjetas/pagoTarjeta');
// const recargaBilletera = require('./RecargaBilletera/recargaBilletera');

async function consulta(params) {
  switch (params.facturador.codServicio) {
    case '796':
      return pagoTarjetas.consulta(params);
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
    case '796':
      return pagoTarjetas.pago(params);

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
