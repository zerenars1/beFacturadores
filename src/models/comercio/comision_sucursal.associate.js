module.exports = (db) => {
  db.comision_sucursal.belongsTo(db.comision_tarifa, {
    as: 'comision_tarifa',
    foreignKey: 'comision_tarifa_id',
  });

  db.comision_sucursal.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.comision_sucursal.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });

  db.comision_sucursal.belongsTo(db.comercio_sucursal, {
    as: 'comercio_sucursal',
    foreignKey: 'comercio_sucursal_id',
  });
};
