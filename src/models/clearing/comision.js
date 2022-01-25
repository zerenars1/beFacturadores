/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'banco_clearing_comision',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      banco_clearing_banco_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'clearing_banco',
          key: 'id',
        },
      },
      comision_parametro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'banco_clearing_comision_parametro',
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
    },
    {
      sequelize,
      tableName: 'comision',
      schema: 'banco_clearing',
      timestamps: false,
      underscored: true,
    }
  );
};
