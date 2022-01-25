/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comision_generada_detalle',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      comision_generada_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comision_generada',
          key: 'id',
        },
      },
      comision_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Indica si la comision es para el procesador, comercio o banco)',
        references: {
          model: 'comision_tipo',
          key: 'id',
        },
      },
      monto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      iva: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'comision_generada_detalle',
      schema: 'procesadora',
      underscored: true,
      timestamps: false,
    }
  );
};
