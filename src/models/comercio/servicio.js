module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_servicio',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      comercio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comercio_comercio',
          key: 'id',
        },
      },
      facturador_servicio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'servicio',
          schema: 'facturador',
          key: 'id',
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: 'servicio',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
