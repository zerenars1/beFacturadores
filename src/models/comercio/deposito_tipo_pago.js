module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_deposito_tipo_pago',
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
      tableName: 'deposito_tipo_pago',
      schema: 'comercio',
      timestamps: false,
      underscored: true,
    }
  );
};
