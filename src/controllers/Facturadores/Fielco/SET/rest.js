const pagoTributos = require('./Tributos/pagoTributos');

async function consulta(params) {
  if (params.facturador.codServicio === '2118') return pagoTributos.consulta(params);
  return {
    success: false,
    message: `El codigo de servicio facturador ${params.facturador.codServicio} no cuenta con metodo de consulta`
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '2118') return pagoTributos.pago(params);
  return {
    success: false,
    message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de pago`
  };
}

module.exports = {
  pago,
  consulta
};
