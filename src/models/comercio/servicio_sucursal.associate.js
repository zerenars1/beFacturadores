module.exports = (db) => {
  db.comercio_servicio_sucursal.belongsTo(db.comercio_sucursal, {
    as: 'sucursal',
    foreignKey: 'sucursal_id',
  });

  db.comercio_servicio_sucursal.belongsTo(db.servicio, {
    as: 'facturador_servicio',
    foreignKey: 'facturador_servicio_id',
  });
};
