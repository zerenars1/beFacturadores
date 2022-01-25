/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_servicio_sucursal',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      sucursal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          schema: 'comercio',
          model: 'comercio_sucursal',
          key: 'id',
        },
      },
      facturador_servicio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'servicio',
          schema: 'facturador',
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
      tableName: 'servicio_sucursal',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
