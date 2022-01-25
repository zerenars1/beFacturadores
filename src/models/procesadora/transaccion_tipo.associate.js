module.exports = (db) => {
  db.transaccion_tipo.belongsTo(db.caja_movimiento_concepto, {
    as: 'comercio_caja_movimiento_concepto',
    foreignKey: 'comercio_caja_movimiento_concepto_id',
  });
};
