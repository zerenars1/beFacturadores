/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'facturador_comision_servicio',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      comision_parametro_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'comision_parametro',
          key: 'id',
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      usuario_alta_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      servicio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'servicio',
          key: 'id',
        },
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
    },
    {
      sequelize,
      tableName: 'comision_servicio',
      schema: 'facturador',
      underscored: true,
      timestamps: false,
    }
  );
};
