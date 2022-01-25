module.exports = (db) => {
  db.comercio_deposito.belongsTo(db.procesadora_cuenta, {
    as: 'cuenta',
    foreignKey: 'cuenta_id',
  });

  db.comercio_deposito.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_id',
  });

  db.comercio_deposito.belongsTo(db.usuario, {
    as: 'usuario_confirmacion',
    foreignKey: 'usuario_confirmacion_id',
  });

  db.comercio_deposito.belongsTo(db.comercio_comercio, {
    as: 'comercio',
    foreignKey: 'comercio_id',
  });

  db.comercio_deposito.belongsTo(db.banco, {
    as: 'banco_origen',
    foreignKey: 'banco_origen_id',
  });

  db.comercio_deposito.belongsTo(db.comercio_deposito_tipo_pago, {
    as: 'deposito_tipo_pago',
    foreignKey: 'deposito_tipo_pago_id',
  });
};
