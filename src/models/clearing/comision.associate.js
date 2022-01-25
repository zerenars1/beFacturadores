module.exports = (db) => {
  db.banco_clearing_comision.belongsTo(db.clearing_banco, {
    as: 'banco',
    foreignKey: 'banco_clearing_banco_id',
  });

  db.clearing_banco.hasOne(db.banco_clearing_comision, {
    as: 'comision',
    foreignKey: 'comision_parametro_id',
  });

  db.banco_clearing_comision.belongsTo(db.banco_clearing_comision_parametro, {
    as: 'comision_parametro',
    foreignKey: 'comision_parametro_id',
  });

  db.banco_clearing_comision_parametro.hasOne(db.banco_clearing_comision, {
    as: 'comision',
    foreignKey: 'comision_parametro_id',
  });

  db.banco_clearing_comision.belongsTo(db.usuario, {
    as: 'usuario_alta',
    foreignKey: 'usuario_alta_id',
  });

  db.banco_clearing_comision.belongsTo(db.usuario, {
    as: 'usuario_baja',
    foreignKey: 'usuario_baja_id',
  });
};
