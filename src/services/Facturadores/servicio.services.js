/* eslint-disable consistent-return */
const { servicio } = require('../../models');

const getService = (servicio_id) => {
  const promise = new Promise((resolve, reject) => {
    try {
      const result = servicio.findOne({ where: { id: servicio_id } });
      resolve(result);
    } catch (error) {
      return reject(error);
    }
  });
  return promise;
};

module.exports = { getService };
