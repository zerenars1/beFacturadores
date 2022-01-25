/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'cuenta_modalidad',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      signo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '+',
      },
    },
    {
      sequelize,
      tableName: 'cuenta_modalidad',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
