/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'persona_telefono',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      persona_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'persona',
          key: 'id',
        },
      },
      pais_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pais',
          key: 'id',
        },
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero_interno: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefono_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'telefono_tipo',
          key: 'id',
        },
      },
      celular: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'persona_telefono',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
