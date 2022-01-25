const pagoTarjeta = require('./tarjetas/pagoTarjetas');
const pagoPrestamos = require('./prestamos/pagoPrestamo');
const pagoSolidaridad = require('./solidaridad/pagoSolidaridad');
const pagoAportes = require('./aportes/pagoAportes');

async function consulta(params) {
  if (params.facturador.codServicio === '809') return pagoTarjeta.consulta(params);
  if (params.facturador.codServicio === '1252') return pagoPrestamos.consulta(params);
  if (params.facturador.codServicio === '1254') return pagoSolidaridad.consulta(params);
  if (params.facturador.codServicio === '1253') return pagoAportes.consulta(params);
  return {
    success: false,
    message: `El codigo de servicio facturador ${params.facturador.codServicio} no cuenta con metodo de consulta`,
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '809') return pagoTarjeta.pago(params);
  if (params.facturador.codServicio === '1252') return pagoPrestamos.pago(params);
  if (params.facturador.codServicio === '1254') return pagoSolidaridad.pago(params);
  if (params.facturador.codServicio === '1253') return pagoAportes.pago(params);
  return {
    success: false,
    message: `El codigo de servicio facturador ${params.facturador.codServicio} no cuenta con metodo de pago`,
  };
}

module.exports = {
  pago,
  consulta,
};
