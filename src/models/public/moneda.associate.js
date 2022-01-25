module.exports = (db) => {
  db.moneda.belongsTo(db.pais, {
    as: 'pais',
    foreignKey: 'pais_id',
  });

  db.moneda.hasMany(db.servicio, {
    as: 'servicio',
    foreignKey: 'moneda_id',
  });

  db.moneda.hasMany(db.caja_parametro, {
    as: 'caja',
    foreignKey: 'caja_id',
  });

  db.moneda.hasMany(db.denominacion_valor, {
    as: 'moneda',
    foreignKey: 'moneda_id',
  });
};
