module.exports = (db) => {
  db.banco.hasOne(db.comercio_deposito, {
    as: 'comercio_deposito',
    foreignKey: 'banco_origen_id',
  });
};
