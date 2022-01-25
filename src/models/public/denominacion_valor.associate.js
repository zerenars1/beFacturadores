module.exports = (db) => {
  db.denominacion_valor.belongsTo(db.denominacion_valor_tipo, {
    as: 'denominacion_valor_tipo',
    foreignKey: 'denominacion_valor_tipo_id',
  });

  db.denominacion_valor.belongsTo(db.moneda, {
    as: 'moneda',
    foreignKey: 'moneda_id',
  });
};
