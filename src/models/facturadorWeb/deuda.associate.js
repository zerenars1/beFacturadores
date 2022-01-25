module.exports = (db) => {
  db.deuda.belongsTo(db.facturador, {
    as: 'facturador',
    foreignKey: 'facturador_id',
  });

  db.deuda.belongsTo(db.servicio, {
    as: 'servicio',
    foreignKey: 'servicio_id',
  });

  db.deuda.belongsTo(db.pago, {
    as: 'pago',
    foreignKey: 'pago_id',
  });
};
