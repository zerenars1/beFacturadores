module.exports = (db) => {
  db.clearing_cuenta.belongsTo(db.clearing_banco, {
    as: 'banco_clearing',
    foreignKey: 'banco_clearing_banco_id',
  });

  db.clearing_cuenta.belongsTo(db.cuenta_tipo, {
    as: 'cuenta_tipo',
    foreignKey: 'cuenta_tipo_id',
  });

  db.clearing_cuenta.belongsTo(db.cuenta_modalidad, {
    as: 'cuenta_modalidad',
    foreignKey: 'cuenta_modalidad_id',
  });

  db.clearing_cuenta.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.clearing_cuenta.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });
};
