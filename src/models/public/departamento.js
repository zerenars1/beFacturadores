/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'departamento',
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
      pais_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pais',
          key: 'id',
        },
      },
      secuencia: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'departamento',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
