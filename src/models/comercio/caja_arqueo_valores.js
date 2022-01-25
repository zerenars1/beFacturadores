/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'caja_arqueo_valores',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      caja_arqueo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Id del;arqueo',
        references: {
          model: 'caja_arqueo',
          key: 'id',
        },
      },
      denominacion_valor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Tipo billete o moneda',
        references: {
          model: 'denominacion_valor',
          key: 'id',
        },
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Cantidad de valor',
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Cantidad por valor numerico de ,a denominacion',
      },
    },
    {
      sequelize,
      tableName: 'caja_arqueo_valores',
      schema: 'comercio',
      underscored: true,
      timestamps: false,
    }
  );
};
