module.exports = (db) => {
  db.comision_generada_detalle.belongsTo(db.comision_generada, {
    as: 'comision_generada',
    foreignKey: 'comision_generada_id',
  });

  db.comision_generada_detalle.belongsTo(db.comision_tipo, {
    as: 'comision_tipo',
    foreignKey: 'comision_tipo_id',
  });
};
