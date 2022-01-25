module.exports = (db) => {
  db.comercio_estado_cuenta_tipo_transaccion.hasMany(db.comercio_estado_cuenta_detalle, {
    as: 'comercio_estado_cuenta_tipo_transaccion',
    foreignKey: 'estado_cuenta_tipo_transaccion_id',
  });
};
