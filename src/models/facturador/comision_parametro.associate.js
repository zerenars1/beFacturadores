module.exports = (db) => {
  db.facturador_comision_parametro.belongsTo(db.iva_tipo, {
    as: 'iva_tipo',
    foreignKey: 'iva_tipo_id',
  });

  db.facturador_comision_parametro.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.facturador_comision_parametro.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });
};
