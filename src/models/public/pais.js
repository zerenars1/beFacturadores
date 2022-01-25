module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'pais',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      abreviatura: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nacionalidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secuencia: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: '0',
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      prefijo_telefonico: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      abreviatura_iso3166: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path_bandera: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'pais',
      timestamps: false,
      schema: 'public',
      underscored: true,
    }
  );
};
