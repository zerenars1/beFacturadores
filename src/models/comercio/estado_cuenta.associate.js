module.exports = (db) => {
  db.comercio_estado_cuenta.belongsTo(db.comercio_comercio, {
    as: 'comercio',
    foreignKey: 'comercio_id',
  });

  db.comercio_estado_cuenta.hasMany(db.comercio_estado_cuenta_detalle, {
    as: 'estado_cuenta',
    foreignKey: 'estado_cuenta_id',
  });
};
