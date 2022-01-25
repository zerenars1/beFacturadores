/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comision_tarifa_detalle',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      comision_tarifa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comision_tarifa_detalle',
          key: 'id',
        },
      },
      servicio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'servicio',
          key: 'id',
        },
      },
      porcentaje: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      monto_fijo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      iva_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'iva_tipo',
          key: 'id',
        },
      },
      monto_minimo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      monto_maximo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'comision_tarifa_detalle',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
