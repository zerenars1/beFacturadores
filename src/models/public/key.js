/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'key',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa',
          key: 'id',
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      tableName: 'key',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
