const { envVarExist, envVarIsInt } = require('./helpers');

envVarExist('MAX_PAGE_SIZE');
envVarExist('DEFAULT_PAGE_SIZE');
envVarExist('MIN_PAGE_SIZE');

envVarIsInt('MAX_PAGE_SIZE');
envVarIsInt('DEFAULT_PAGE_SIZE');
envVarIsInt('MIN_PAGE_SIZE');

module.exports = {
  maxPageSize: parseInt(process.env.MAX_PAGE_SIZE, 10),
  defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE, 10),
  minPagesize: parseInt(process.env.MIN_PAGE_SIZE, 10),
};
