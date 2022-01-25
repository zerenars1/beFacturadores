module.exports = (db) => {
  db.comercio_servicio.belongsTo(db.comercio_comercio, {
    as: 'comercio',
    foreignKey: 'comercio_id',
  });

  db.comercio_servicio.belongsTo(db.servicio, {
    as: 'facturador_servicio',
    foreignKey: 'facturador_servicio_id',
  });
};
