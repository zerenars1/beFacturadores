/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'caja_parametro',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      caja_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'caja',
          key: 'id',
        },
      },
      moneda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'moneda',
          key: 'id',
        },
      },
      monto_minimo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        comment: 'Monto minimo en moneda local que una caja puede tener',
      },
      monto_maximo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        comment: 'Monto maximo en moneda local que una caja puede tener',
      },
    },
    {
      sequelize,
      tableName: 'caja_parametro',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
