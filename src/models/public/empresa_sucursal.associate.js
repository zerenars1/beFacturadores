module.exports = (db) => {
  db.empresa_sucursal.belongsTo(db.empresa, {
    as: 'empresa',
    foreignKey: 'empresa_id',
  });

  db.empresa_sucursal.belongsTo(db.ciudad, {
    as: 'ciudad',
    foreignKey: 'ciudad_id',
  });
  db.empresa_sucursal.hasMany(db.comercio_sucursal, {
    as: 'comercio_sucursal',
    foreignKey: 'empresa_sucursal_id',
  });
  db.empresa_sucursal.hasMany(db.empresa_sucursal_imagen, {
    as: 'empresa_sucursal_imagen',
    foreignKey: 'empresa_sucursal_id',
  });
};
