/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'mora_parametro',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      servicio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'servicio',
          key: 'id',
        },
      },
      porcentaje: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      monto_fijo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mora_dia: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: 'mora_parametro',
      schema: 'facturador_web',
      timestamps: false,
      underscored: true,
    }
  );
};
