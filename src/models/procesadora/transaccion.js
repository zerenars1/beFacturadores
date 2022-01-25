/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'transaccion',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      transaccion_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'transaccion_tipo',
          key: 'id',
        },
      },
      transaccion_anulada_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'transaccion',
          key: 'id',
        },
      },
      transaccion_estado_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'transaccion_estado',
          key: 'id',
        },
      },
      transaccion_padre_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'transaccion',
          key: 'id',
        },
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      latitud: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0,
      },
      longitud: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0,
      },
      monto: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn('now'),
      },
      fecha_anulacion: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      respuesta: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      facturador_servicio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'servicio',
          key: 'id',
        },
      },
      referencia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      anulacion_motivo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comercio_sucursal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursal',
          key: 'id',
        },
      },
      codigo_verificacion: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0',
        comment: 'Codigo de verficación hash para el ticket',
      },
      respuesta_facturador: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      comision: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'transaccion',
      schema: 'procesadora',
      hasTrigger: true,
      timestamps: false,
      underscored: true,
    }
  );
};
