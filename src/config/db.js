const { envVarExist } = require('./helpers');

envVarExist('PG_DB');
envVarExist('PG_HOST');
envVarExist('PG_PORT');
envVarExist('PG_USER');
envVarExist('PG_PASS');

envVarExist('PG_SSL');

const config = {
  database: process.env.PG_DB,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  logging: process.env.ENV === 'development',
  dialect: 'postgres',
  timezone: 'America/Asuncion',
  dialectOptions: {
    useUTC: false,
  },
};

if (process.env.PG_SSL === 'true') {
  config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const connectionString = `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

module.exports = { connectionString, ...config };
