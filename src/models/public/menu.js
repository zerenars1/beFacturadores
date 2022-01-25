module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'menu',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      etiqueta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      end_point: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'menu',
          key: 'id',
        },
      },
      orden: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      tableName: 'menu',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
