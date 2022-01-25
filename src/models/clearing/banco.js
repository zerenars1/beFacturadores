/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'clearing_banco',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Referencia del banco en el esquema public',
        references: {
          model: 'empresa',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'banco',
      schema: 'banco_clearing',
      timestamps: false,
      underscored: true,
    }
  );
};
