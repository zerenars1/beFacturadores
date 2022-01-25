/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'caja_arqueo_detalle',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
      monto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      cantidad_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      monto_anulado: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      cantidad_anulado: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      moneda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'moneda',
          key: 'id',
        },
      },
    },
    {
      tableName: 'caja_arqueo_detalle',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
