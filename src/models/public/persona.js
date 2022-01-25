module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'persona',
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
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sexo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sexo',
          key: 'id',
        },
      },
      nacionalidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'campo correspondiente a la tabla pais',
        references: {
          model: 'pais',
          key: 'id',
        },
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      estado_civil_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'estado_civil',
          key: 'id',
        },
      },
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
    },
    {
      sequelize,
      tableName: 'persona',
      schema: 'public',
      underscored: true,
      timestamps: false,
    }
  );
};
