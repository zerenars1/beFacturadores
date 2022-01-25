module.exports = (db) => {
  db.procesadora.hasMany(db.parametro, {
    as: 'parametros',
    foreignKey: 'procesadora_id',
  });

  db.procesadora.belongsTo(db.empresa, {
    as: 'empresa',
    foreignKey: 'empresa_id',
  });
};
