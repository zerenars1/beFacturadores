/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'facturador',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      secuencia: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa',
          key: 'id',
        },
      },
      categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'categoria',
          key: 'id',
        },
      },
      procesadora_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'procesadora',
          key: 'id',
        },
      },
      tiempo_acreditacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 48,
        comment: 'tiempo de acreditacion en horas de la recaudacion',
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      codigo_red: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facturador_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'facturador_tipo',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'facturador',
      schema: 'facturador',
      underscored: true,
      timestamps: false,
    }
  );
};
