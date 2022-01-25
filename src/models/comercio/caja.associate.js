module.exports = (db) => {
  db.caja.belongsTo(db.comercio_sucursal, {
    as: 'sucursal',
    foreignKey: 'sucursal_id',
  });
};
