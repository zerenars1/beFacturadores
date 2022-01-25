/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_comercio_garantia',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      comercio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comercio',
          key: 'id',
        },
      },
      monto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      garantia_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'garantia_tipo',
          key: 'id',
        },
      },
      fecha_vencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'comercio_garantia',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
