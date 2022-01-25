/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'banco_clearing_comision_parametro',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      porcentaje: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      monto_fijo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      monto_minimo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      monto_maximo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      iva_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'iva_tipo',
          key: 'id',
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      fecha_desde: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_hasta: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      transaccion_minima: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      transaccion_maxima: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      usuario_alta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usuario_baja_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'comision_parametro',
      schema: 'banco_clearing',
      timestamps: false,
      underscored: true,
    }
  );
};
