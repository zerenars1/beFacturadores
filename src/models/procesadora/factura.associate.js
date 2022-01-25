module.exports = (db) => {
  db.factura.hasMany(db.factura_detalle, {
    as: 'factura_detalle',
    foreignKey: 'factura_id',
  });

  db.factura.belongsTo(db.contribuyente, {
    as: 'contribuyente',
    foreignKey: 'contribuyente_id',
  });

  db.factura.belongsTo(db.timbrado, {
    as: 'timbrado',
    foreignKey: 'timbrado_id',
  });

  db.factura.belongsTo(db.transaccion, {
    as: 'transaccion',
    foreignKey: 'transaccion_id',
  });
};
