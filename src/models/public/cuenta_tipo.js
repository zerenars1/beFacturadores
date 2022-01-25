/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'cuenta_tipo',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      moneda_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'moneda',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'cuenta_tipo',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
