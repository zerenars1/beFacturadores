/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'persona_direccion',
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
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      edificio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      piso: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descripcion: {
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
      latitud: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      longitud: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      direccion_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'direccion_tipo',
          key: 'id',
        },
      },
      vivienda_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'vivienda_tipo',
          key: 'id',
        },
      },
      barrio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'persona_direccion',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
