module.exports = (db) => {
  db.caja_movimiento.belongsTo(db.transaccion, {
    as: 'transaccion',
    foreignKey: 'transaccion_id',
  });

  db.caja_movimiento.belongsTo(db.caja_arqueo, {
    as: 'caja_arqueo',
    foreignKey: 'caja_arqueo_id',
  });

  db.caja_movimiento.belongsTo(db.caja_movimiento_concepto, {
    as: 'caja_movimiento_concepto',
    foreignKey: 'caja_movimiento_concepto_id',
  });

  db.caja_movimiento.belongsTo(db.medio_pago, {
    as: 'medio_pago',
    foreignKey: 'medio_pago_id',
  });

  db.caja_movimiento.belongsTo(db.banco, {
    as: 'banco',
    foreignKey: 'banco_id',
  });
};
