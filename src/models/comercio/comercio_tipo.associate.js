module.exports = (db) => {
  db.comercio_tipo.hasOne(db.comercio_comercio, {
    as: 'comercio',
    foreignKey: 'comercio_tipo_id',
  });
};
