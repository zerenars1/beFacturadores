module.exports = (db) => {
  db.caja_arqueo.belongsTo(db.caja, {
    as: 'caja',
    foreignKey: 'caja_id',
  });

  db.caja_arqueo.belongsTo(db.usuario, {
    as: 'usuario',
    foreignKey: 'usuario_id',
  });
};
