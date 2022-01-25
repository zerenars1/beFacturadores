/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'empresa_sucursal',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'empresa',
          key: 'id',
        },
      },
      ciudad_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'ciudad',
          key: 'id',
        },
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: true,
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
      observacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitud: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      longitud: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      fecha_baja: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      matriz: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      numero_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      barrio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'empresa_sucursal',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
