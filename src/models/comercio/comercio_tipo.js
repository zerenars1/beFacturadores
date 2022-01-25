module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_tipo',
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
    },
    {
      sequelize,
      tableName: 'comercio_tipo',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
