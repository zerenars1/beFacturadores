const ventaMinutos = require('./ventaMinutos');
const pagoFactura = require('./pagoFactura');
const pagoFacturaTigoStart = require('./pagoFacturaTigoStart');

async function consulta(params) {
  if (params.facturador.codServicio === '1139') {
    return pagoFacturaTigoStart.consulta(params);
  } if (params.facturador.codServicio === '2293') {
    return pagoFactura.consulta(params);
  }
  return {
    success: false,
    message: 'No se especifico el codigo de servicio del facturador',
    data: {}
  };
}

async function pago(params) {
  switch (params.facturador.codServicio) {
    case '743':
      return ventaMinutos.pago(params);
    case '2293':
      return pagoFactura.pago(params);
    case '1139':
      return pagoFacturaTigoStart.pago(params);
    default:
      return {
        success: false,
        message: 'No se especifico el codigo de servicio del facturador',
        data: {}
      };
  }
}

module.exports = {
  pago,
  consulta
};
