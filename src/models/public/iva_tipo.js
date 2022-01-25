/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'iva_tipo',
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
      porcentaje: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      incluido: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      pais_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pais',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'iva_tipo',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
