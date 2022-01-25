module.exports = (db) => {
  db.departamento.belongsTo(db.pais, {
    as: 'pais',
    foreignKey: 'pais_id',
  });

  db.departamento.hasMany(db.ciudad, {
    as: 'ciudad',
    foreignKey: 'departamento_id',
  });
};
