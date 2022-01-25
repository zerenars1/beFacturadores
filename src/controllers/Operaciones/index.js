const facturadores = require('../Facturadores/index');

module.exports = {
  async ejecutarOperacion(params) {
    const { archivoFacturador, nombre_funcion } = params.facturador;

    if (!archivoFacturador || !nombre_funcion) return 'No existe función para el facturador';

    return facturadores[archivoFacturador][nombre_funcion](params);
  },
};
