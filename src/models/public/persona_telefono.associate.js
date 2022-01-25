module.exports = (db) => {
  db.persona_telefono.belongsTo(db.persona, {
    as: 'persona',
    foreignKey: 'persona_id',
  });

  db.persona_telefono.belongsTo(db.telefono_tipo, {
    as: 'telefono_tipo',
    foreignKey: 'telefono_tipo_id',
  });

  db.persona_telefono.belongsTo(db.pais, {
    as: 'pais',
    foreignKey: 'pais_id',
  });
};
