module.exports = (db) => {
  db.factura_detalle.belongsTo(db.factura, {
    as: 'factura',
    foreignKey: 'factura_id',
  });

  db.factura_detalle.belongsTo(db.factura_concepto, {
    as: 'factura_concepto',
    foreignKey: 'concepto_id',
  });
};
