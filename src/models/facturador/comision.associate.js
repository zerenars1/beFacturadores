module.exports = (db) => {
  db.facturador_comision.belongsTo(db.facturador_comision_parametro, {
    as: 'comision_parametro',
    foreignKey: 'comision_parametro_id',
  });

  db.facturador_comision.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.facturador_comision.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });

  db.facturador_comision.belongsTo(db.facturador, {
    as: 'facturador',
    foreignKey: 'facturador_id',
  });
};
