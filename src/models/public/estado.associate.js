module.exports = (db) => {
  db.estado.hasOne(db.estado_cuenta, {
    foreignKey: 'estado',
    as: 'estados',
  });
};
