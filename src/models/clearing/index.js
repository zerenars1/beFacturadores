'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const config = (sequelize, Sequelize) => {
  const db = {};
  //eslint-disable-next-line no-sync
  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.slice(-13) !== '.associate.js'
    )
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });
  // me falta buscar los ficheros de asociacion por cada modelo

  return db;
};

module.exports = config;
