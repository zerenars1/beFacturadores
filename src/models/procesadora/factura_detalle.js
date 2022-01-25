/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'factura_detalle',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      factura_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'factura',
          key: 'id',
        },
      },
      concepto_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      importe_unitario: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      importe_total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      iva: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'factura_detalle',
      schema: 'procesadora',
      timestamps: false,
      underscored: true,
    }
  );
};
