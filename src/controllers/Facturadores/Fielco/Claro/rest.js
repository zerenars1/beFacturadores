const cargaSaldo = require('./cargaSaldo');
const pagoFacturaFija = require('./pagoFacturaFija');
const pagoPorNroDocumento = require('./pagoPorNroDocumento/pagoPorNroDocumento');

async function consulta(params) {
  if (params.facturador.codServicio === '758') {
    return pagoPorNroDocumento.consulta(params);
  }
  return {
    success: false,
    message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de consulta`,
    data: {}
  };
}

async function pago(params) {
  switch (params.facturador.codServicio) {
    case '738':
      return cargaSaldo.pago(params);
    case '740':
      return pagoFacturaFija.pago(params);
    case '758':
      return pagoPorNroDocumento.pago(params);
    default:
      return {
        success: false,
        message: `El codigo de servicio facturador${params.facturador.codServicio} no cuenta con metodo de pago`,
        data: {}
      };
  }
}

module.exports = {
  pago,
  consulta
};
