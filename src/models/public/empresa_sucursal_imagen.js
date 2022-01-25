/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'empresa_sucursal_imagen',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      empresa_sucursal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa_sucursal',
          key: 'id',
        },
      },
      nombre_archivo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ruta_archivo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      imagen_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'imagen_tipo',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'empresa_sucursal_imagen',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
