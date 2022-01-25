module.exports = (db) => {
  db.facturador_cuenta.belongsTo(db.banco, {
    as: 'banco',
    foreignKey: 'banco_id',
  });

  db.facturador_cuenta.belongsTo(db.servicio, {
    as: 'servicio',
    foreignKey: 'servicio_id',
  });

  db.facturador_cuenta.belongsTo(db.cuenta_tipo, {
    as: 'cuenta_tipo',
    foreignKey: 'cuenta_tipo_id',
  });

  db.facturador_cuenta.belongsTo(db.cuenta_modalidad, {
    as: 'cuenta_modalidad',
    foreignKey: 'cuenta_modalidad_id',
  });

  db.facturador_cuenta.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.facturador_cuenta.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });
};
