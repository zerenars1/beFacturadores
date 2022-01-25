module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_estado_cuenta_tipo_transaccion',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      signo: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'estado_cuenta_tipo_transaccion',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
