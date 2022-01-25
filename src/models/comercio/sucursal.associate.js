module.exports = (db) => {
  db.comercio_sucursal.belongsTo(db.comercio_comercio, {
    as: 'comercio',
    foreignKey: 'comercio_id',
  });

  db.comercio_sucursal.belongsTo(db.empresa_sucursal, {
    as: 'empresa_sucursal',
    foreignKey: 'empresa_sucursal_id',
  });

  db.comercio_sucursal.belongsTo(db.empresa, {
    as: 'empresa',
    foreignKey: 'empresa_id',
  });
};
