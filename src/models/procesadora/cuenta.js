module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'procesadora_cuenta',
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
      procesadora_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'procesadora',
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
      denominacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'cuenta',
      schema: 'procesadora',
      underscored: true,
      timestamps: false,
    }
  );
};
