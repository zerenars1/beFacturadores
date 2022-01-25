/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'timbrado',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      establecimiento: {
        type: DataTypes.CHAR(3),
        allowNull: false,
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ruc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      factura_inicial: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      factura_final: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      factura_actual: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      procesadora_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'procesadora',
          key: 'id',
        },
      },
      sucursal: {
        type: DataTypes.CHAR(3),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'timbrado',
      schema: 'procesadora',
      timestamps: false,
      underscored: true,
    }
  );
};
