module.exports = (db) => {
  db.transaccion.belongsTo(db.transaccion, {
    as: 'transaccion_anulada',
    foreignKey: 'transaccion_anulada_id',
  });

  db.transaccion.belongsTo(db.transaccion, {
    as: 'transaccion_padre',
    foreignKey: 'transaccion_padre_id',
  });

  db.transaccion.belongsTo(db.transaccion_tipo, {
    as: 'transaccion_tipo',
    foreignKey: 'transaccion_tipo_id',
  });

  db.transaccion.belongsTo(db.usuario, {
    as: 'usuario',
    foreignKey: 'usuario_id',
  });

  db.transaccion.belongsTo(db.servicio, {
    as: 'servicio',
    foreignKey: 'facturador_servicio_id',
  });

  db.transaccion.belongsTo(db.comercio_sucursal, {
    as: 'comercio_sucursal',
    foreignKey: 'comercio_sucursal_id',
  });

  db.transaccion.belongsTo(db.transaccion_estado, {
    as: 'transaccion_estado',
    foreignKey: 'transaccion_estado_id',
  });
};
