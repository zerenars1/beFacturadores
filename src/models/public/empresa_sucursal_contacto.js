/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'empresa_sucursal_contacto',
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
      contacto_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'contacto_tipo',
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
    },
    {
      sequelize,
      tableName: 'empresa_sucursal_contacto',
      schema: 'public',
      underscored: true,
      timestamps: false,
    }
  );
};
