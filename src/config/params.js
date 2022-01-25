const { envVarExist } = require('./helpers');

envVarExist('NODE_ICU_DATA');
envVarExist('HOST');
envVarExist('PORT');
envVarExist('LOG_DB_URL');
envVarExist('LOG_DB_USER');
envVarExist('LOG_DB_PASSWORD');
envVarExist('LOG_DB_PROTOCOL');
envVarExist('LOG_DB_DATABASE');
envVarExist('LOG_DB_ADMIN_PASSWORD');
envVarExist('LOG_DB_ADMIN_USER');

module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
  logDBUrl: process.env.LOG_DB_URL,
  logDBUser: process.env.LOG_DB_USER,
  logDBPass: process.env.LOG_DB_PASSWORD,
  logDBProtocol: process.env.LOG_DB_PROTOCOL,
  logDBDatabase: process.env.LOG_DB_DATABASE,
  logDBAdminPass: process.env.LOG_DB_ADMIN_PASSWORD,
  logDBAdminUser: process.env.LOG_DB_ADMIN_USER,
};
