/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comision_sucursal',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      comercio_sucursal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursal',
          key: 'id',
        },
      },
      comision_tarifa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comision_tarifa',
          key: 'id',
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      fecha_desde: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      fecha_hasta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("now() + '5 years'::interval"),
      },
      usuario_alta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      usuario_baja_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      fecha_baja: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'comision_sucursal',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
