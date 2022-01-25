module.exports = (db) => {
  db.comercio_ejecutivo_comercial.belongsTo(db.persona, {
    as: 'persona',
    foreignKey: 'persona_id',
  });

  db.comercio_ejecutivo_comercial.belongsTo(db.comercio_comercio, {
    as: 'comercio',
    foreignKey: 'comercio_id',
  });
};
