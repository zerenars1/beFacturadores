/* jshint indent: 2 */

// TODO: relacionar este con empresa
module.exports = (db) => {
  db.clearing_banco.belongsTo(db.empresa, {
    as: 'empresa',
    foreignKey: 'empresa_id',
  });

  db.clearing_banco.hasMany(db.banco_clearing_comision, {
    as: 'banco',
    foreignKey: 'banco_clearing_banco_id',
  });
};
