module.exports = (db) => {
  db.persona_direccion.belongsTo(db.persona, {
    as: 'persona',
    foreignKey: 'persona_id',
  });
  db.persona_direccion.belongsTo(db.ciudad, {
    as: 'ciudad',
    foreignKey: 'ciudad_id',
  });

  db.persona_direccion.belongsTo(db.direccion_tipo, {
    as: 'direccion_tipo',
    foreignKey: 'direccion_tipo_id',
  });

  db.persona_direccion.belongsTo(db.vivienda_tipo, {
    as: 'vivienda_tipo',
    foreignKey: 'vivienda_tipo_id',
  });
};
