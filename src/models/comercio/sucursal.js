/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_sucursal',
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
          model: 'comercio_comercio',
          key: 'id',
        },
      },
      empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa',
          key: 'id',
        },
      },
      empresa_sucursal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa_sucursal',
          key: 'id',
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: 'sucursal',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
