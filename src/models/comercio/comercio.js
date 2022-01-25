/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_comercio',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      procesadora_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'procesadora',
          key: 'id',
        },
      },
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn('now'),
      },
      path_logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa',
          key: 'id',
        },
      },
      tiempo_acreditacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 48,
        comment: 'tiempo de acreditacion de las comisiones de las bocas',
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      bloqueado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      comercio_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'comercio_tipo',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'comercio',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
