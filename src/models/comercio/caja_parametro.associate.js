module.exports = (db) => {
  db.caja_parametro.belongsTo(db.caja, {
    as: 'caja',
    foreignKey: 'caja_id',
  });

  db.caja_parametro.belongsTo(db.moneda, {
    as: 'moneda',
    foreignKey: 'moneda_id',
  });
};
