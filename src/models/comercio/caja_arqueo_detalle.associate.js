module.exports = (db) => {
  db.caja_arqueo_detalle.belongsTo(db.caja_arqueo, {
    as: 'caja_arqueo',
    foreignKey: 'caja_arqueo_id',
  });

  db.caja_arqueo_detalle.belongsTo(db.medio_pago, {
    as: 'medio_pago',
    foreignKey: 'medio_pago_id',
  });

  db.caja_arqueo_detalle.belongsTo(db.moneda, {
    as: 'moneda',
    foreignKey: 'moneda_id',
  });
};
