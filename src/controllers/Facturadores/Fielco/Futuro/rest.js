const pagoMantenimiento = require('./mantenimiento/pagoMantenimiento');
const pagoServicios = require('./servicios/pagoServicios');
const pagoTitulos = require('./titulos/pagoTitulos')
const pagoParcelas = require('./parcelas/pagoParcelas')

async function consulta(params) {
  if (params.facturador.codServicio === '1006') return pagoMantenimiento.consulta(params);
  if (params.facturador.codServicio === '858') return pagoServicios.consulta(params);
  if (params.facturador.codServicio === '1007') return pagoTitulos.consulta(params);
  if (params.facturador.codServicio === '1005') return pagoParcelas.consulta(params);


  return {
    success: false,
    message: `El codigo de servicio facturador ${params.facturador.codServicio} no cuenta con metodo de consulta`,
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '1006') return pagoMantenimiento.pago(params);
  if (params.facturador.codServicio === '858') return pagoServicios.pago(params);
  if (params.facturador.codServicio === '1007') return pagoTitulos.pago(params);
  if (params.facturador.codServicio === '1005') return pagoParcelas.pago(params);

  return {
    success: false,
    message: `El codigo de servicio facturador ${params.facturador.codServicio} no cuenta con metodo de pago`,
  };
}

module.exports = {
  pago,
  consulta,
};
