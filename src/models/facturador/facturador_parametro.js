const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facturador_parametro', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    facturador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'facturador',
        key: 'id'
      }
    },
    codigo_lote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Codigo de lote para pago de factura copaco"
    },
    fecha_apertura_lote: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "fecha y hora de apertura de lote para pagos de factura copaco"
    },
    fecha_cierre_lote: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "fecha de cierre del lote de pago para copaco"
    }
  }, {
    sequelize,
    tableName: 'facturador_parametro',
    schema: 'facturador',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "parametro_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
