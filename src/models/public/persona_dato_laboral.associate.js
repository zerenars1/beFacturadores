module.exports = (db) => {
  db.persona_dato_laboral.belongsTo(db.persona, {
    as: 'persona',
    foreignKey: 'persona_id',
  });

  db.persona_dato_laboral.belongsTo(db.empresa_sucursal, {
    as: 'empresa_sucursal',
    foreignKey: 'empresa_sucursal_id',
  });

  db.persona_dato_laboral.belongsTo(db.cargo, {
    as: 'cargo',
    foreignKey: 'cargo_id',
  });

  db.persona_dato_laboral.belongsTo(db.persona_departamento_laboral, {
    as: 'departamento_laboral',
    foreignKey: 'departamento_laboral_id',
  });
};
