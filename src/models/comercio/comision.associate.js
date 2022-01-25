module.exports = (db) => {
  db.comercio_comision.belongsTo(db.comision_tarifa, {
    as: 'comision_tarifa',
    foreignKey: 'comision_tarifa_id',
  });

  db.comercio_comision.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.comercio_comision.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });

  db.comercio_comision.belongsTo(db.comercio_comercio, {
    as: 'comercio',
    foreignKey: 'comercio_id',
  });
};
