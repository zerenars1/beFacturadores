module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comercio_estado_cuenta',
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
          model: 'comercio',
          key: 'id',
        },
      },
      linea_credito: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      saldo_a_depositar: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      saldo_operativo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_sin_depositar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'estado_cuenta',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
