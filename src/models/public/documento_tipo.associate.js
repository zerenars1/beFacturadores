module.exports = (db) => {
  db.documento_tipo.belongsTo(db.pais, {
    as: 'pais',
    foreignKey: 'pais_id',
  });
};
