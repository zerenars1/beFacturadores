module.exports = (db) => {
  db.servicio.belongsTo(db.facturador, {
    as: 'facturador',
    foreignKey: 'facturador_id',
  });

  db.servicio.belongsTo(db.moneda, {
    as: 'moneda',
    foreignKey: 'moneda_id',
  });

  db.servicio.hasMany(db.servicio_operacion, {
    as: 'servicio_operacion',
    foreignKey: 'servicio_id',
  });

  db.servicio.hasMany(db.servicio_medio_pago, {
    as: 'servicio_medio_pago',
    foreignKey: 'servicio_id',
  });

  db.servicio.belongsTo(db.comision_calculo_tipo, {
    as: 'comision_calculo_tipo',
    foreignKey: 'comision_calculo_tipo_id',
  });

  db.servicio.hasMany(db.comercio_servicio_sucursal, {
    as: 'servicio_sucursal',
    foreignKey: 'facturador_servicio_id',
  });

  db.servicio.hasMany(db.comercio_servicio, {
    as: 'comercio_servicio',
    foreignKey: 'facturador_servicio_id',
  });
};
