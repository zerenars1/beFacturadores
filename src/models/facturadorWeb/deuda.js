/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'deuda',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      facturador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'facturador',
          key: 'id',
        },
      },
      servicio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'servicio',
          key: 'id',
        },
      },
      referencia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nro_operacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_vencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      cuota_numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      anulado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pago_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'pago',
          key: 'id',
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dias_atraso: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mora_parametro_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'mora_parametro',
          key: 'id',
        },
      },
      importe: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      importe_mora: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numero_telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'deuda',
      schema: 'facturador_web',
      hasTrigger: true,
      underscored: true,
      timestamps: false,
    }
  );
};
