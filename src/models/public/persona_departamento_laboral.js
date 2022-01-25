module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'persona_departamento_laboral',
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
      tableName: 'persona_departamento_laboral',
      schema: 'public',
      underscored: true,
      timestamps: false,
    }
  );
};
