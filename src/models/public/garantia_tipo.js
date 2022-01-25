module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'garantia_tipo',
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
      sequelize,
      tableName: 'garantia_tipo',
      timestamps: false,
      schema: 'public',
      underscored: true,
    }
  );
};
