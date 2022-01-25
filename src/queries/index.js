const { sequelize, Sequelize } = require('../models');
const readQueries = require('./readQueries');

const queries = readQueries(__dirname);

module.exports = {
  async getSQL(params, nombreFuncion) {
    try {
      return await sequelize.query(queries[nombreFuncion], {
        type: Sequelize.QueryTypes.SELECT,
        replacements: params,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
