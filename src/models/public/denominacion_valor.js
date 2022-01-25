/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'denominacion_valor',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      moneda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Moneda local o extranjera',
        references: {
          model: 'caja',
          key: 'id',
        },
      },
      denominacion_valor_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Tipo billete o moneda',
        references: {
          model: 'denominacion_valor_tipo',
          key: 'id',
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Valor alfanumerco de la denominacion Ej: 10.000. Se usa como descripcion',
      },
      valor: {
        type: DataTypes.DECIMAL(15, 2, 'int'),
        allowNull: false,
        comment: 'Valor numerico de la denominacion Ej: 10000. Se utiliza para calculos',
      },
    },
    {
      sequelize,
      tableName: 'denominacion_valor',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
