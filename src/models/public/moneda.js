/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'moneda',
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
      iso_4217: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      singular: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      plural: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pais_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pais',
          key: 'id',
        },
      },
      abreviatura: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      decimales: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      redondeo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'moneda',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
