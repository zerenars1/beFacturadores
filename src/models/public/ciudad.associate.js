module.exports = (db) => {
  db.ciudad.belongsTo(db.departamento, {
    as: 'departamento',
    foreignKey: 'departamento_id',
  });
  db.ciudad.hasMany(db.barrio, {
    as: 'barrio',
    foreignKey: 'ciudad_id',
  });
};
