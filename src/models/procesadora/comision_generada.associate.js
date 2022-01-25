module.exports = (db) => {
  db.comision_generada.belongsTo(db.procesadora, {
    as: 'procesadora',
    foreignKey: 'procesadora_id',
  });

  db.comision_generada.belongsTo(db.facturador_comision_parametro, {
    as: 'comision_parametro',
    foreignKey: 'facturador_comision_parametro_id',
  });

  db.comision_generada.belongsTo(db.transaccion, {
    as: 'transaccion',
    foreignKey: 'transaccion_id',
  });
};
