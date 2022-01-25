module.exports = (db) => {
  db.transaccion_ticket.belongsTo(db.transaccion, {
    as: 'transaccion',
    foreignKey: 'transaccion_id',
  });
};
