/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'banco',
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
        comment: 'Referencia del banco en el esquema public',
      },
      operativa: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      clearing: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'banco',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
