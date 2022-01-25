module.exports = (db) => {
  db.comision_tarifa_detalle.belongsTo(db.comision_tarifa, {
    as: 'comision_tarifa',
    foreignKey: 'comision_tarifa_id',
  });

  db.comision_tarifa_detalle.belongsTo(db.servicio, {
    as: 'servicio',
    foreignKey: 'servicio_id',
  });

  db.comision_tarifa_detalle.belongsTo(db.iva_tipo, {
    as: 'iva_tipo',
    foreignKey: 'iva_tipo_id',
  });
};
