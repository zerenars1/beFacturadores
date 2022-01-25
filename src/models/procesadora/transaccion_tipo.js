/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'transaccion_tipo',
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
      nombre_front: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'nombre a mostrar en el front',
      },
      comercio_caja_movimiento_concepto_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:
          'Indica el concepto de movimiento que detonara una transaccion, si es nulo quiere decir que la transaccion no detona ningun momiento de caja',
        references: {
          model: 'caja_movimiento_concepto',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'transaccion_tipo',
      schema: 'procesadora',
      timestamps: false,
      underscored: true,
    }
  );
};
