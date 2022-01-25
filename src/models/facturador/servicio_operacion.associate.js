module.exports = (db) => {
  db.servicio_operacion.belongsTo(db.servicio, {
    as: 'servicio',
    foreignKey: 'servicio_id',
  });

  db.servicio_operacion.belongsTo(db.transaccion_tipo, {
    as: 'transaccion_tipo',
    foreignKey: 'transaccion_tipo_id',
  });

  db.servicio_operacion.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.servicio_operacion.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });
};
