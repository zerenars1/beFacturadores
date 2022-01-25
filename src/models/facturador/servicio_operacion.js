/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'servicio_operacion',
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
      transaccion_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'transaccion_tipo',
          key: 'id',
        },
      },
      secuencia: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: 'Establece el orden en el que se mostraran las operaciones en el front',
      },
      host: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      host_validacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      host_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      api_key: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      end_point: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puerto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      metodo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mostrar: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Indica si el servicio_operacion debe o no aparecer listado en el front',
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      fecha_baja: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      usuario_alta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      usuario_baja_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      time_out: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30000,
        comment: 'Tiempo de espera al webservice del facturador en milisegundos',
      },
      nombre_funcion: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "'pago_estandar'::character varying",
      },
      protocolo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "'https://'::character varying",
      },
      cod_servicio_facturador: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo_transaccion_facturador: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'servicio_operacion',
      schema: 'facturador',
      underscored: true,
      timestamps: false,
    }
  );
};
