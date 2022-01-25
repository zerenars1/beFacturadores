/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'pago',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      transaccion_pago_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      anulado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      importe: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      importe_mora: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'pago',
      schema: 'facturador_web',
      timestamps: false,
      underscored: true,
    }
  );
};
