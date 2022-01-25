/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'estado_cuenta',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      facturador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'facturador',
          key: 'id',
        },
      },
      transaccion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'transaccion',
          key: 'id',
        },
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      importe_cobrado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comision: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      neto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      estado: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      fecha_pago: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'estado_cuenta',
      schema: 'facturador_web',
      timestamps: false,
      underscored: true,
    }
  );
};
