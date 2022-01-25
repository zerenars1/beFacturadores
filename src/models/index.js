const pg = require('pg');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

pg.types.setTypeParser(1082, 'text', function (text) {
  return text;
});
pg.types.setTypeParser(1184, 'text', function (text) {
  return text;
});
pg.types.setTypeParser(1114, 'text', function (text) {
  return text;
});

const basename = path.basename(__filename);

const {
  db: { connectionString, logging, dialectOptions, dialect, timezone },
} = require('../config');

const sequelize = new Sequelize(connectionString, {
  logging,
  dialectOptions,
  dialect,
  timezone,
});

// eslint-disable-next-line no-sync
const _public = require('./public')(sequelize, Sequelize);
const procesadora = require('./procesadora')(sequelize, Sequelize);
const facturador = require('./facturador')(sequelize, Sequelize);
const comercio = require('./comercio')(sequelize, Sequelize);
const banco_clearing = require('./clearing')(sequelize, Sequelize);
const facturador_web = require('./facturadorWeb')(sequelize, Sequelize);

const db = Object.assign(
  {},
  _public,
  procesadora,
  facturador,
  comercio,
  banco_clearing,
  facturador_web
);

// eslint-disable-next-line no-sync
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) !== '.js'
  )
  .flatMap((dir) =>
    fs.readdirSync(path.join(__dirname, dir)).map((file) => [dir, file])
  )
  .filter(
    ([dir, file]) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.slice(-13) === '.associate.js'
  )
  .forEach(([dir, file]) => {
    require(path.join(__dirname, dir, file))(db);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
