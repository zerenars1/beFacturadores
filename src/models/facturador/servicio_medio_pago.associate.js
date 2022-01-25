module.exports = (db) => {
  db.servicio_medio_pago.belongsTo(db.servicio, {
    as: 'servicio',
    foreignKey: 'servicio_id',
  });

  db.servicio_medio_pago.belongsTo(db.medio_pago, {
    as: 'medio_pago',
    foreignKey: 'medio_pago_id',
  });
};
