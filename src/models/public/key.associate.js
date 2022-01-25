module.exports = (db) => {
  db.key.belongsTo(db.empresa, {
    as: 'empresa',
    foreignKey: 'empresa_id',
  });
};
