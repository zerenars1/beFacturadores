const pagoTarjetas = require('./tarjetas/pagoTarjeta');
const recargaBilletera = require('./RecargaBilletera/recargaBilletera');

async function consulta(params) {
  switch (params.facturador.codServicio) {
    case '801':
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
    case '801':
      return pagoTarjetas.pago(params);
    case '2261':
      return recargaBilletera.pago(params);
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
