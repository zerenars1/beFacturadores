const pagoServicios = require('./Pagos/pagoServicios');


async function consulta(params) {
  if (params.facturador.codServicio === '825') return pagoServicios.consulta(params);

  return {
    success: false,
    message: `El codigo de servicio facturador ${params.facturador.codServicio} no cuenta con metodo de consulta`
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '825') return pagoServicios.pago(params);
  return {
    success: false,
    message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de pago`
  };
}

module.exports = {
  pago,
  consulta
};
