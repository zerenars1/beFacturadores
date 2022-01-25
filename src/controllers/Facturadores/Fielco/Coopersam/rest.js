const pagoPrestamo = require('./Prestamos/pagoPrestamo');

async function consulta(params) {
  if (params.facturador.codServicio === '2262') return pagoPrestamo.consulta(params);
  return {
    success: false,
    message: `El codigo de servicio facturador ${params.facturador.codServicio} no cuenta con metodo de consulta`
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '2262') return pagoPrestamo.pago(params);
  return {
    success: false,
    message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de pago`
  };
}

module.exports = {
  pago,
  consulta
};
