module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'sexo',
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
    },
    {
      tableName: 'sexo',
      timestamps: false,
      schema: 'public',
      underscored: true,
    }
  );
};
