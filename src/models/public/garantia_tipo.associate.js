module.exports = (db) => {
  db.garantia_tipo.hasMany(db.comercio_comercio_garantia, {
    as: 'comercio_garantia',
    foreignKey: 'garantia_tipo_id',
  });
};
