/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'usuario',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      persona_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'persona',
          key: 'id',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path_imagen: {
        type: DataTypes.STRING,
        allowNull: true,
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
      fecha_caducidad: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: '(CURRENT_DATE + 365)',
        comment: 'fecha en la que la contraseña debera ser cambiada',
      },
      password_reset: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      password_reset_caducidad: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      activado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Se usa para saber si el usuario ya hizo la activacion',
      },
    },
    {
      sequelize,
      tableName: 'usuario',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
