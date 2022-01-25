/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'menu_dashboard',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'menu',
          key: 'id',
        },
      },
      dashboard_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'dashboard',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'menu_dashboard',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
