module.exports = (db) => {
  db.comision_calculo_tipo.hasMany(db.servicio, {
    as: 'servicio',
    foreignKey: 'comision_calculo_tipo_id',
  });
};
