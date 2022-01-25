module.exports = (db) => {
  db.medio_pago.hasMany(db.servicio_medio_pago, {
    as: 'servicio_medio_pago',
    foreignKey: 'medio_pago_id',
  });
};
