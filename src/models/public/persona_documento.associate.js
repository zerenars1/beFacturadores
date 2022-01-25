module.exports = (db) => {
  db.persona_documento.belongsTo(db.persona, {
    as: 'persona',
    foreignKey: 'persona_id',
  });

  db.persona_documento.belongsTo(db.documento_tipo, {
    as: 'documento_tipo',
    foreignKey: 'documento_tipo_id',
  });
};
