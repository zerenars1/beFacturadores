module.exports = (db) => {
  db.empresa_rubro.hasMany(db.empresa, {
    foreignKey: 'empresa_rubro_id',
    as: 'empresa',
  });
};
