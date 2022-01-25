/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'facturador_comision',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      facturador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'facturador',
          key: 'id',
        },
      },
      comision_parametro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: 'comision',
      schema: 'facturador',
      underscored: true,
      timestamps: false,
    }
  );
};
