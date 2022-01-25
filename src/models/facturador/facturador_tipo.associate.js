module.exports = (db) => {
  db.facturador.belongsTo(db.facturador, {
    as: 'facturador',
    foreignKey: 'facturador_tipo_id',
  });
};
