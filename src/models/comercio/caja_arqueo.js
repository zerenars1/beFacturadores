/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'caja_arqueo',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      caja_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'caja',
          key: 'id',
        },
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      fecha_apertura: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn('now'),
      },
      fecha_cierre: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      faltante_guarani: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      faltante_dolar: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      sobrante_guarani: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      sobrante_dolar: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      saldo_inicial_guarani: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      saldo_inicial_dolar: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      saldo_final_guarani: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      saldo_final_dolar: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      saldo_inicial_cheque_guarani: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      saldo_inicial_cheque_dolar: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      saldo_final_cheque_guarani: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      saldo_final_cheque_dolar: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'caja_arqueo',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
