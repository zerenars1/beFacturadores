module.exports = (db) => {
  db.estado_cuenta.belongsTo(db.facturador, {
    as: 'facturador',
    foreignKey: 'facturador_id',
  });

  db.estado_cuenta.belongsTo(db.estado, {
    as: 'estados',
    foreignKey: 'estado',
  });
};
