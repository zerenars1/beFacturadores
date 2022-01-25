/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'persona_dato_laboral',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      persona_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'persona',
          key: 'id',
        },
      },
      empresa_sucursal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa_sucursal',
          key: 'id',
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cargo',
          key: 'id',
        },
      },
      ingreso_fijo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      otros_ingresos: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      fecha_ingreso: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      fecha_egreso: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      fecha_activacion: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      departamento_laboral_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'persona_departamento_laboral',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'persona_dato_laboral',
      schema: 'public',
      underscored: true,
      timestamps: false,
    }
  );
};
