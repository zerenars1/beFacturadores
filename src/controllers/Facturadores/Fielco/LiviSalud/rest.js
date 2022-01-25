const pagoCuotas = require('./Cuotas/pagoCuotas');
// const pagoCuotasAlianza = require('./Alianza/pagoCuotas')

async function consulta(params) {
  if (params.facturador.codServicio === '1453') return pagoCuotas.consulta(params);
//   if (params.facturador.codServicio === '1481') return pagoCuotasAlianza.consulta(params);
  return {
    success: false,
    message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de consulta`
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '1453') return pagoCuotas.pago(params);
//   if (params.facturador.codServicio === '1481') return pagoCuotasAlianza.pago(params);
  return {
    success: false,
    message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de pago`
  };
}

module.exports = {
  pago,
  consulta
};
