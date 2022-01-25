const pagoPrestamos = require('./Prestamos/pagoPrestamos');
const pagoAportes = require('./Aportes/pagoAportes');
const pagoSolidaridad = require('./Solidaridad/pagoSolidaridad');
const pagoTarjetas = require('./Tarjetas/pagoTarjeta');

async function consulta(params) {
  if (params.facturador.codServicio === '2289') return pagoPrestamos.consulta(params);
  if (params.facturador.codServicio === '2288') return pagoAportes.consulta(params);
  if (params.facturador.codServicio === '2290') return pagoSolidaridad.consulta(params);
  if (params.facturador.codServicio === '816') return pagoTarjetas.consulta(params);
  return {
    success: false,
    message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de consulta`
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '2289') return pagoPrestamos.pago(params);
  if (params.facturador.codServicio === '2288') return pagoAportes.pago(params);
  if (params.facturador.codServicio === '2290') return pagoSolidaridad.pago(params);
  if (params.facturador.codServicio === '816') return pagoTarjetas.pago(params);
  return {
    success: false,
    message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de pago`
  };
}

module.exports = {
  pago,
  consulta
};
