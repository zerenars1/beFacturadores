/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'barrio',
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
      ciudad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ciudad',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'barrio',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
