/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'factura',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      contribuyente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'contribuyente',
          key: 'id',
        },
      },
      timbrado_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'timbrado',
          key: 'id',
        },
      },
      nro_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'factura_uk',
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      importe_total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      importe_total_gr5: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      importe_total_gr10: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      importe_total_ex: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      importe_total_iva: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      importe_total_iva5: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      importe_total_iva10: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      transaccion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'transaccion',
          key: 'id',
        },
      },
      anulado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'factura',
      schema: 'procesadora',
      hasTrigger: true,
      timestamps: false,
      underscored: true,
    }
  );
};
