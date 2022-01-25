module.exports = (db) => {
  db.procesadora_cuenta.belongsTo(db.banco, {
    as: 'banco',
    foreignKey: 'banco_id',
  });

  db.procesadora_cuenta.belongsTo(db.procesadora, {
    as: 'procesadora',
    foreignKey: 'procesadora_id',
  });

  db.procesadora_cuenta.belongsTo(db.cuenta_tipo, {
    as: 'cuenta_tipo',
    foreignKey: 'cuenta_tipo_id',
  });

  db.procesadora_cuenta.belongsTo(db.cuenta_modalidad, {
    as: 'cuenta_modalidad',
    foreignKey: 'cuenta_modalidad_id',
  });

  db.procesadora_cuenta.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.procesadora_cuenta.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });

  db.procesadora_cuenta.hasMany(db.comercio_deposito, {
    as: 'cuenta',
    foreignKey: 'cuenta_id',
  });
};
