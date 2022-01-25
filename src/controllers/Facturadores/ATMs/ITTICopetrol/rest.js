const depositoPlaya = require('./playa/depositoPlaya');
const depositoTienda = require('./tienda/depositoPlaya');

async function consulta(params) {
  if (params.facturador.codServicio === '1') return depositoPlaya.consulta(params);
  if (params.facturador.codServicio === '2') return depositoTienda.consulta(params);
  return {
    success: false,
    message: `El codigo de servicio facturador ${params.facturador.codServicio} no cuenta con metodo de consulta`
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '1') return depositoPlaya.pago(params);
  if (params.facturador.codServicio === '2') return depositoTienda.consulta(params);
  return {
    success: false,
    message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de pago`
  };
}

module.exports = {
  pago,
  consulta
};
