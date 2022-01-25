module.exports = (db) => {
  db.comercio_comercio.belongsTo(db.procesadora, {
    as: 'procesadora',
    foreignKey: 'procesadora_id',
  });

  db.comercio_comercio.belongsTo(db.empresa, {
    as: 'empresa',
    foreignKey: 'empresa_id',
  });

  db.comercio_comercio.hasMany(db.comercio_sucursal, {
    as: 'comercio',
    foreignKey: 'comercio_id',
  });

  db.comercio_comercio.belongsTo(db.comercio_comercio_garantia, {
    as: 'comercio_garantia',
    foreignKey: 'id',
  });

  db.comercio_comercio.belongsTo(db.comercio_tipo, {
    as: 'comercio_tipo',
    foreignKey: 'comercio_tipo_id',
  });

  db.comercio_comercio.hasOne(db.comercio_estado_cuenta, {
    as: 'comercio_estado_cuenta',
    foreignKey: 'comercio_id',
  });

  db.comercio_comercio.hasMany(db.comercio_deposito, {
    as: 'comercio_deposito',
    foreignKey: 'comercio_id',
  });
};
