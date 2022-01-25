const { facturador, sequelize, servicio_operacion, transaccion } = require('../../models');

const getFacturador = async (servicio_id) => {
  try {
    const result = await facturador.findOne({
      where: {
        id: [
          sequelize.literal(`(select facturador_id 
                              from facturador.servicio
                              where id = ${servicio_id})`),
        ],
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getServicioOperacion = async (servicio_id, transaccion_tipo_id) => {
  try {
    const result = await servicio_operacion.findOne({
      where: {
        servicio_id,
        transaccion_tipo_id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getTransaccionPadre = async (transaccion_padre_id) => {
  try {
    const result = await transaccion.findOne({
      where: {
        id: transaccion_padre_id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getFacturador,
  getServicioOperacion,
  getTransaccionPadre,
};
