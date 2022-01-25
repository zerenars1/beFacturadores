module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'caja',
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
      sucursal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comercio_sucursal',
          key: 'id',
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      numero_caja: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'caja',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
