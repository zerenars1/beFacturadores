/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'procesadora',
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
      nombre_comercial: {
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
    },
    {
      sequelize,
      tableName: 'procesadora',
      schema: 'procesadora',
      timestamps: false,
      underscored: true,
    }
  );
};
