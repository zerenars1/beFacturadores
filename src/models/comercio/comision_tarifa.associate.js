module.exports = (db) => {
  db.comision_tarifa.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.comision_tarifa.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });
};
