module.exports = (db) => {
  db.empresa_sucursal_contacto.belongsTo(db.contacto_tipo, {
    as: 'contacto_tipo',
    foreignKey: 'contacto_tipo_id',
  });
  db.empresa_sucursal_contacto.belongsTo(db.empresa_sucursal, {
    as: 'empresa_sucursal',
    foreignKey: 'empresa_sucursal_id',
  });
  db.empresa_sucursal_contacto.belongsTo(db.persona, {
    as: 'persona',
    foreignKey: 'persona_id',
  });
};
