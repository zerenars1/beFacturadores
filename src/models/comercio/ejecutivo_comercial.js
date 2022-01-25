module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_ejecutivo_comercial',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      comercio_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'comercio',
          key: 'id',
        },
      },
      persona_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'persona',
          key: 'id',
        },
      },
      fecha_desde: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fecha_hasta: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'ejecutivo_comercial',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
