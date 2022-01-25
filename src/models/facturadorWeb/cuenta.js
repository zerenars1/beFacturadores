/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'facturador_web_cuenta',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      banco_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'banco',
          key: 'id',
        },
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      denominacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      facturador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'facturador',
          key: 'id',
        },
      },
      cuenta_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cuenta_tipo',
          key: 'id',
        },
      },
      cuenta_modalidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: sequelize.fn('facturador_web.cuenta_modalidad_function'),
        references: {
          model: 'cuenta_modalidad',
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
      fecha_baja: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'cuenta',
      schema: 'facturador_web',
      timestamps: false,
      underscored: true,
    }
  );
};
