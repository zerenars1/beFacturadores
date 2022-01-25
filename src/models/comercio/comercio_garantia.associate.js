module.exports = (db) => {
  db.comercio_comercio_garantia.belongsTo(db.garantia_tipo, {
    as: 'garantia_tipo',
    foreignKey: 'garantia_tipo_id',
  });
  db.comercio_comercio_garantia.belongsTo(db.comercio_comercio, {
    as: 'comercio',
    foreignKey: 'comercio_id',
  });
};
