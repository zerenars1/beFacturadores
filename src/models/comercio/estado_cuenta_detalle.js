module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_estado_cuenta_detalle',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      estado_cuenta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comercio_estado_cuenta',
          key: 'id',
        },
      },
      estado_cuenta_tipo_transaccion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comercio_estado_cuenta_tipo_transaccion',
          key: 'id',
        },
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      monto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'estado_cuenta_detalle',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
