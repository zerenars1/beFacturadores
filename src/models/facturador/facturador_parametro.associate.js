module.exports = (db) => {
  db.facturador_parametro.belongsTo(db.facturador, {
    as: 'facturador',
    foreignKey: 'facturador_id',
  });

};
