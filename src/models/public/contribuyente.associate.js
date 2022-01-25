module.exports = (db) => {
  db.timbrado.hasMany(db.factura, {
    as: 'timbrado',
    foreignKey: 'timbrado_id',
  });
};
