/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'servicio',
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
      consulta_referencia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      formulario: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [
          {
            name: 'DOCUMENTO',
            type: 'text',
            label: 'Nº DOCUMENTO',
            imgAyuda: '',
            opciones: [],
            required: true,
            placeholder: 'Número de documento',
            errorMessage: 'Debe ingresar su número de documento',
          },
        ],
      },
      codigo_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      facturador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'facturador',
          key: 'id',
        },
      },
      moneda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'moneda',
          key: 'id',
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      comision_calculo_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment:
          'Identifica si el facturador pasa la comision incluida en el monto, pasa en campo separado o debe calcular la procesadora',
        references: {
          model: 'comision_calculo_tipo',
          key: 'id',
        },
      },
      frontend: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: 'servicio',
      schema: 'facturador',
      underscored: true,
      timestamps: false,
    }
  );
};
