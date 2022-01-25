module.exports = (db) => {
  db.persona.belongsTo(db.sexo, { as: 'sexo', foreignKey: 'sexo_id' });

  db.persona.belongsTo(db.pais, {
    as: 'nacionalidad',
    foreignKey: 'nacionalidad_id',
  });

  db.persona.belongsTo(db.estado_civil, {
    as: 'estado_civil',
    foreignKey: 'estado_civil_id',
  });

  db.persona.hasMany(db.persona_telefono, {
    as: 'telefono',
    foreignKey: 'persona_id',
  });

  db.persona.hasMany(db.persona_documento, {
    as: 'documento',
    foreignKey: 'persona_id',
  });

  db.persona.hasOne(db.persona_dato_laboral, {
    as: 'dato_laboral',
    foreignKey: 'persona_id',
  });
};
