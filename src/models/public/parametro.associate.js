module.exports = (db) => {
  db.parametro.belongsTo(db.procesadora, {
    as: 'procesadora',
    foreignKey: 'procesadora_id',
  });
};
