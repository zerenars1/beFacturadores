module.exports = (db) => {
  db.empresa.hasOne(db.facturador, {
    as: 'facturador',
    foreignKey: 'empresa_id',
  });

  db.empresa.belongsTo(db.empresa_rubro, {
    as: 'empresa_rubro',
    foreignKey: 'empresa_rubro_id',
  });

  db.empresa.belongsTo(db.empresa_tipo, {
    as: 'empresa_tipo',
    foreignKey: 'empresa_tipo_id',
  });

  db.empresa.belongsTo(db.empresa_personeria, {
    as: 'empresa_personeria',
    foreignKey: 'empresa_personeria_id',
  });

  db.empresa.hasMany(db.comercio_sucursal, {
    as: 'sucursales_comercio',
    foreignKey: 'empresa_id',
  });

  db.empresa.hasMany(db.comercio_comercio, {
    as: 'comercio',
    foreignKey: 'empresa_id',
  });

  db.empresa.hasMany(db.empresa_sucursal, {
    as: 'sucursal',
    foreignKey: 'empresa_id',
  });

  db.empresa.hasMany(db.empresa_sucursal_imagen, {
    as: 'imagen_tipo',
    foreignKey: 'empresa_sucursal_id',
  });

  db.empresa.hasMany(db.empresa_documento, {
    as: 'empresa_documento',
    foreignKey: 'empresa_id',
  });
};
