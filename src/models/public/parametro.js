module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'parametro',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      procesadora_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'procesadora',
          key: 'id',
        },
        unique: 'parametro_procesadora_id_nombre',
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'parametro_procesadora_id_nombre',
      },
      tabla: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      front: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      tableName: 'parametro',
      schema: 'public',
      underscored: true,
      timestamps: false,
    }
  );
};
