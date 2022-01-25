module.exports = (db) => {
  db.archivo_configuracion.belongsTo(db.facturador, {
    as: 'facturador',
    foreignKey: 'facturador_id',
  });
};
