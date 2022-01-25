module.exports = (db) => {
  db.comercio_deposito_tipo_pago.hasOne(db.comercio_deposito, {
    as: 'comercio_deposito',
    foreignKey: 'deposito_tipo_pago_id',
  });
};
