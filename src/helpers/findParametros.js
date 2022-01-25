/* eslint-disable arrow-body-style */
const { parametro } = require('../models');

const findParametro = (nombre, modelo) => {
  return new Promise((resolve, reject) => {
    parametro
      .findOne({
        where: {
          nombre,
        },
      })
      .then((param) => {
        if (param !== null) {
          const model = modelo.findOne({ where: { id: param.valor } });
          return resolve(model);
        }

        throw new Error('Sistema no configurado');
      })
      .catch((error) => reject(new Error(error)));
  });
};

module.exports = {
  findParametro,
};
