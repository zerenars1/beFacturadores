/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comision_tarifa',
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
    },
    {
      sequelize,
      tableName: 'comision_tarifa',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
