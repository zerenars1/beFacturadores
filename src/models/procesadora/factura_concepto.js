/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'factura_concepto',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      iva_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'iva_tipo',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'factura_concepto',
      schema: 'procesadora',
      timestamps: false,
      underscored: true,
    }
  );
};
