module.exports = (db) => {
  db.factura_concepto.hasMany(db.factura_detalle, {
    as: 'factura_concepto',
    foreignKey: 'concepto_id',
  });

  db.factura_concepto.belongsTo(db.iva_tipo, {
    as: 'iva_tipo',
    foreignKey: 'iva_tipo_id',
  });
};
