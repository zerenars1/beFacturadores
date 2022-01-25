module.exports = (db) => {
  db.iva_tipo.hasOne(db.comision_tarifa_detalle, {
    as: 'comision_tarifa_detalle',
    foreignKey: 'iva_tipo_id',
  });
  db.iva_tipo.hasMany(db.pais, {
    as: 'pais',
    foreignKey: 'id',
  });
};
