module.exports = (db) => {
  db.empresa_tipo.hasMany(db.empresa, {
    as: 'empresa',
    foreignKey: 'empresa_tipo_id',
  });
};
