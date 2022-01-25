/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ciudad',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'departamento',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'ciudad',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
