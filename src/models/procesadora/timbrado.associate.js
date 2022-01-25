module.exports = (db) => {
  db.timbrado.hasOne(db.factura, {
    as: 'factura',
    foreignKey: 'timbrado_id',
  });

  db.timbrado.belongsTo(db.procesadora, {
    as: 'procesadora',
    foreignKey: 'procesadora_id',
  });
};
