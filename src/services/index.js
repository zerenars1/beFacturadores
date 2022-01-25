const webServices = require('./Facturadores/Web/facturadorWeb.services');
const responseFormatteServices = require('./Facturadores/formateadorRespuesta.services');
const consultaServices = require('./Operaciones/consulta.services');

module.exports = {
  webServices,
  responseFormatteServices,
  consultaServices,
};
