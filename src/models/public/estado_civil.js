module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'estado_civil',
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
      tableName: 'estado_civil',
      timestamps: false,
      schema: 'public',
      underscored: true,
    }
  );
};
