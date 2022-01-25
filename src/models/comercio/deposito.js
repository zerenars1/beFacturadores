module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_deposito',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      monto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      cuenta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cuenta',
          key: 'id',
        },
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      confirmado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      fecha_confirmacion: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      usuario_confirmacion_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      comercio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comercio_comercio',
          key: 'id',
        },
      },
      banco_origen_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'banco',
          key: 'id',
        },
      },
      deposito_tipo_pago_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'comercio_deposito_tipo_pago',
          key: 'id',
        },
      },
      referencia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'deposito',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
