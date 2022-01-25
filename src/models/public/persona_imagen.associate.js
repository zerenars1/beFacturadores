module.exports = (db) => {
  db.persona_imagen.belongsTo(db.persona, {
    as: 'persona',
    foreignKey: 'persona_id',
  });

  db.persona_imagen.belongsTo(db.imagen_tipo, {
    as: 'imagen_tipo',
    foreignKey: 'imagen_tipo_id',
  });
};
