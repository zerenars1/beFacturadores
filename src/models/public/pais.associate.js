module.exports = (db) => {
  db.pais.hasMany(db.departamento, {
    as: 'departamento',
    foreignKey: 'pais_id',
  });
};
