module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'dashboard',
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
      tableName: 'dashboard',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
