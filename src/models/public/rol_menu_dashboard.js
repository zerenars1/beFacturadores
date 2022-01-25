/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'rol_menu_dashboard',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      menu_dashboard_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'menu_dashboard',
          key: 'id',
        },
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'rol',
          key: 'id',
        },
      },
      listar: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      ver: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      agregar: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      editar: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      eliminar: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      acceso_total: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'rol_menu_dashboard',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
