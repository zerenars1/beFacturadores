module.exports = (db) => {
  db.facturador_comision_servicio.belongsTo(db.facturador_comision_parametro, {
    as: 'comision_parametro',
    foreignKey: 'comision_parametro_id',
  });

  db.facturador_comision_servicio.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.facturador_comision_servicio.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });

  db.facturador_comision_servicio.belongsTo(db.servicio, {
    as: 'servicio',
    foreignKey: 'servicio_id',
  });
};
