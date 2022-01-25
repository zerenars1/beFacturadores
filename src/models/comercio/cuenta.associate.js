module.exports = (db) => {
  db.comercio_cuenta.belongsTo(db.banco, {
    as: 'banco',
    foreignKey: 'banco_id',
  });

  db.comercio_cuenta.belongsTo(db.comercio_comercio, {
    as: 'comercio',
    foreignKey: 'comercio_id',
  });

  db.comercio_cuenta.belongsTo(db.cuenta_tipo, {
    as: 'cuenta_tipo',
    foreignKey: 'cuenta_tipo_id',
  });

  db.comercio_cuenta.belongsTo(db.cuenta_modalidad, {
    as: 'cuenta_modalidad',
    foreignKey: 'cuenta_modalidad_id',
  });

  db.comercio_cuenta.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.comercio_cuenta.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });

  db.comercio_cuenta.belongsTo(db.empresa_documento, {
    as: 'empresa_documento',
    foreignKey: 'empresa_documento_id',
  });
};
