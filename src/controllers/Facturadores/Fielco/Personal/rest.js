const ventaMinutos = require('./ventaMinutos');
const pagoFactura = require('./pagoFactura');
const personalTV = require('./personalTV');

async function consulta(params) {
  if (params.facturador.codServicio === '782') {
    return personalTV.consulta(params);
  }
  return {
    success: false,
    message: `El ${params.facturador.codServicio} sevicio no cuenta con consultas`,
    data: {}
  };
}

async function pago(params) {
  if (params.facturador.codServicio === '745') {
    return ventaMinutos.pago(params);
  }

  if (params.facturador.codServicio === '2294') {
    return pagoFactura.pago(params);
  }

  if (params.facturador.codServicio === '782') {
    return personalTV.pago(params);
  }

  return {
    success: false,
    message: 'No se especifico el codigo de servicio del facturador',
    data: {}
  };
}

module.exports = {
  pago,
  consulta
};
