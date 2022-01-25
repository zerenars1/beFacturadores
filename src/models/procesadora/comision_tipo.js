/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comision_tipo',
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
        type: DataTypes.CHAR(1),
        allowNull: false,
        comment:
          'Para identificar si es una comision que se paga (-) o que se cobra (+) con respecto a la procesadora',
      },
    },
    {
      sequelize,
      tableName: 'comision_tipo',
      schema: 'procesadora',
      underscored: true,
      timestamps: false,
    }
  );
};
