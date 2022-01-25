module.exports = (db) => {
  db.cuenta_tipo.belongsTo(db.moneda, {
    as: 'moneda',
    foreignKey: 'moneda_id',
  });
};
