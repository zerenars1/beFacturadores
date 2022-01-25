module.exports = (db) => {
  db.facturador.belongsTo(db.empresa, {
    as: 'empresa',
    foreignKey: 'empresa_id',
  });

  db.facturador.belongsTo(db.categoria, {
    as: 'categoria',
    foreignKey: 'categoria_id',
  });

  db.facturador.belongsTo(db.procesadora, {
    as: 'procesadora',
    foreignKey: 'procesadora_id',
  });

  db.facturador.hasMany(db.servicio, {
    as: 'servicio',
    foreignKey: 'facturador_id',
  });

  db.facturador.belongsTo(db.facturador_tipo, {
    as: 'facturador_tipo',
    foreignKey: 'facturador_tipo_id',
  });

  db.facturador.hasMany(db.facturador_comision, {
    as: 'facturador_comision',
    foreignKey: 'facturador_id',
  });
};
