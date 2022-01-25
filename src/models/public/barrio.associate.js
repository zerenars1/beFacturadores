module.exports = (db) => {
  db.barrio.belongsTo(db.ciudad, {
    as: 'ciudad',
    foreignKey: 'ciudad_id',
  });
};
