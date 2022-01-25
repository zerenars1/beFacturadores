/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comision_generada',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      procesadora_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'procesadora',
          key: 'id',
        },
      },
      facturador_comision_parametro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comision_parametro',
          key: 'id',
        },
      },
      transaccion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        comment: 'monto de comision generado',
      },
      anulado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      iva: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'comision_generada',
      schema: 'procesadora',
      underscored: true,
      timestamps: false,
    }
  );
};
