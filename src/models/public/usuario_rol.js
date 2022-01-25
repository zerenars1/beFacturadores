module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'usuario_rol',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'rol',
          key: 'id',
        },
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
    },
    {
      tableName: 'usuario_rol',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
