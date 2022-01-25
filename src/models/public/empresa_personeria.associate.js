module.exports = (db) => {
  db.empresa_personeria.hasMany(db.empresa, {
    foreignKey: 'empresa_personeria_id',
    as: 'empresa',
  });
};
