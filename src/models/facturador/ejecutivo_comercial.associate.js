module.exports = (db) => {
  db.facturador_ejecutivo_comercial.belongsTo(db.persona, {
    as: 'persona',
    foreignKey: 'persona_id',
  });

  db.facturador_ejecutivo_comercial.belongsTo(db.facturador, {
    as: 'facturador',
    foreignKey: 'facturador_id',
  });
};
