module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'rol',
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
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      dashboard_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'dashboard',
          key: 'id',
        },
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'rol',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
