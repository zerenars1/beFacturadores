/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'caja_movimiento',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      transaccion_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      caja_arqueo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'caja_arqueo',
          key: 'id',
        },
      },
      medio_pago_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'medio_pago',
          key: 'id',
        },
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn('now'),
      },
      monto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      monto_recibido: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0,
      },
      monto_vuelto: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0,
      },
      anulado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      caja_movimiento_concepto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'caja_movimiento_concepto',
          key: 'id',
        },
      },
      numero_cheque: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      fecha_cheque: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      banco_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'banco',
          key: 'id',
        },
      },
      numero_cuenta_cheque: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      moneda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'caja_movimiento',
      schema: 'comercio',
      hasTrigger: true,
      underscored: true,
      timestamps: false,
    }
  );
};
