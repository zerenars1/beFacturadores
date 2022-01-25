const moment = require('moment');
const phin = require('phin');
const uuid = require('uuid').v1;
const createHttpError = require('http-errors');
const { params } = require('../config');

const {
  logDBUrl,
  logDBUser,
  logDBPass,
  logDBProtocol,
  logDBDatabase,
  logDBAdminPass,
  logDBAdminUser
} = params;

const URL = `${logDBProtocol}${logDBUrl}`;

const admin = phin.defaults({
  method: 'PUT',
  parse: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  core: { auth: `${logDBAdminUser}:${logDBAdminPass}` },
});

const tryCreateLoggerUser = () => {
  const request = {
    url: `${URL}/_users/org.couchdb.user:${logDBUser}`,
    data: JSON.stringify({
      name: logDBUser,
      password: logDBPass,
      roles: ['logger'],
      type: 'user',
    }),
  };
  return admin(request);
};

const tryConfigureDB = () => {
  const data = {
    members: { roles: [logDBUser], names: [logDBUser] },
    admins: { roles: [logDBUser] },
  };
  const request = {
    url: `${URL}/${logDBDatabase}/_security`,
    data: JSON.stringify(data),
  };
  return admin(request);
};

const tryCreateDb = () => {
  const request = {
    url: `${URL}/${logDBDatabase}?partitioned=true`,
  };
  return admin(request);
};

const createDB = (db) => {
  const request = {
    url: `${URL}/${db}`,
  };
  return admin(request);
};

const checkCouchDB = () => {
  const logMessage = (txt) => console.log(txt);
  const ok = 'COUCHDB CHECK OK:';
  const setup = Promise.all([
    createDB('_users'),
    createDB('_replicators'),
    createDB('_global_changes'),
  ]);
  const dbCreated = setup
    .then(() => tryCreateDb())
    .then((res) => {
      if (res.statusCode === 201) { return `${ok} Base de datos creada exitosamente`; }
      if (res.statusCode === 200) { return `${ok} Base de datos creada exitosamente`; }
      if (res.statusCode === 412) return `${ok} Base de datos ya existe`;
      return Promise.reject(createHttpError(res.statusCode, res.message));
    })
    .then(logMessage)
    .then(() => tryCreateLoggerUser())
    .then((res) => {
      if (res.statusCode === 200) return `${ok} Usuario creado exitosamente`;
      if (res.statusCode === 201) return `${ok} Usuario creado exitosamente`;
      if (res.statusCode === 409) return `${ok} Usuario ya existia`;
      return Promise.reject(createHttpError(res.statusCode, res.message));
    })
    .then(logMessage)
    .then(() => tryConfigureDB())
    .then((res) => {
      if (res.statusCode === 200) { return `${ok} Usuario configurado exitosamente`; }
      return Promise.reject(createHttpError(res.statusCode, res.message));
    })
    .then(logMessage);
  return dbCreated;
};

const logRequests = (data) => {
  const time = moment().format('YYYYMMDD:HHmmss');
  const id = `${time}-${uuid()}`;

  phin({
    method: 'POST',
    parse: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    core: { auth: `${logDBUser}:${logDBPass}` },
    url: `${URL}/${logDBDatabase}`,
    data: { _id: id, ...data },
  });
};

module.exports = { checkCouchDB, logRequests };
