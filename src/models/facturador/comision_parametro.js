/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'facturador_comision_parametro',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      porcentaje: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      monto_fijo: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0,
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
      usuario_alta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usuario_baja_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'comision_parametro',
      schema: 'facturador',
      underscored: true,
      timestamps: false,
    }
  );
};
