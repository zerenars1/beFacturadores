/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'documento_tipo',
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
      abreviatura: {
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
      fiscal: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'documento_tipo',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
