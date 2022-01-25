module.exports = (db) => {
  db.caja_arqueo_valores.belongsTo(db.caja_arqueo, {
    as: 'caja_arqueo',
    foreignKey: 'caja_arqueo_id',
  });

  db.caja_arqueo_valores.belongsTo(db.denominacion_valor, {
    as: 'denominacion_valor',
    foreignKey: 'denominacion_valor_id',
  });
};
