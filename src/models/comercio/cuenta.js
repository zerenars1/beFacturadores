module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_cuenta',
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
      comercio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comercio',
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
        allowNull: true,
      },
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: true,
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
      empresa_documento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa_documento',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'cuenta',
      schema: 'comercio',
      timestamps: false,
      underscored: true,
    }
  );
};
