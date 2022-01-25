const pagoPrestamos = require('./Prestamos/pagoPrestamos');
const pagoAportes = require('./Aportes/pagoAportes');
const pagoTarjetas = require('./Tarjetas/pagoTarjetas');

async function consulta(params) {
  if (params.facturador.codServicio === '855') return pagoPrestamos.consulta(params);
  if (params.facturador.codServicio === '1138') return pagoAportes.consulta(params);
  if (params.facturador.codServicio === '820') return pagoTarjetas.consulta(params);
  return {
    success: false,
    message: `El codigo de servicio facturador ${params.facturador.codServicio} no cuenta con metodo de consulta`
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '855') return pagoPrestamos.pago(params);
  if (params.facturador.codServicio === '1138') return pagoAportes.pago(params);
  if (params.facturador.codServicio === '820') return pagoTarjetas.pago(params);
  return {
    success: false,
    message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de pago`
  };
}

module.exports = {
  pago,
  consulta
};
