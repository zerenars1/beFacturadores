module.exports = (db) => {
  db.comercio_estado_cuenta_detalle.belongsTo(db.comercio_estado_cuenta, {
    as: 'comercio_estado_cuenta',
    foreignKey: 'estado_cuenta_id',
  });

  db.comercio_estado_cuenta_detalle.belongsTo(db.comercio_estado_cuenta_tipo_transaccion, {
    as: 'comercio_estado_cuenta_tipo_transaccion',
    foreignKey: 'estado_cuenta_tipo_transaccion_id',
  });
};
