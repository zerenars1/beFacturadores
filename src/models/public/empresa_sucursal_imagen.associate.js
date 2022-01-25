module.exports = (db) => {
  db.empresa_sucursal_imagen.belongsTo(db.empresa_sucursal, {
    as: 'empresa_sucursal',
    foreignKey: 'empresa_sucursal_id',
  });
};
