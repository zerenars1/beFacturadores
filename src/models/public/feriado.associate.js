module.exports = (db) => {
  db.feriado.belongsTo(db.pais, {
    as: 'pais',
    foreignKey: 'pais_id',
  });
};
