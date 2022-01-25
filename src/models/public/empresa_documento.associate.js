module.exports = (db) => {
  db.empresa_documento.belongsTo(db.empresa, {
    as: 'empresa',
    foreignKey: 'empresa_id',
  });

  db.empresa_documento.belongsTo(db.documento_tipo, {
    as: 'documento_tipo',
    foreignKey: 'documento_tipo_id',
  });

  db.empresa_documento.hasOne(db.comercio_cuenta, {
    as: 'comercio_cuenta',
    foreignKey: 'empresa_documento_id',
  });
};
