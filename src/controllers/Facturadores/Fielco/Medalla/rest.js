const pagoTargetas = require('./Tarjeta/pagoTarjeta');
const pagoPrestamos = require('./Prestamos/pagoPrestamos');

async function consulta(params) {
  if (params.facturador.codServicio === '819') return pagoTargetas.consulta(params);
  return {
    success: false,
    message: `El servicio ${params.facturador.codServicio} no cuenta con consulta`
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '819') return pagoTargetas.pago(params);
  if (params.facturador.codServicio === '821') return pagoPrestamos.pago(params);
  return {
    success: false,
    message: `El servicio ${params.facturador.codServicio} no cuenta con metodo de pago`
  };
}

module.exports = {
  pago,
  consulta
};
