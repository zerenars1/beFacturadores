/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'empresa',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      razon_social: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre_comercial: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      empresa_rubro_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'empresa_rubro',
          key: 'id',
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'url de la pagina web',
      },
      fecha_constitucion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      cantidad_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      recaudacion_anual: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cantidad_empleados: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cantidad_facturas_mes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      empresa_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'empresa_tipo',
          key: 'id',
        },
      },
      empresa_personeria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa_personeria',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'empresa',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
