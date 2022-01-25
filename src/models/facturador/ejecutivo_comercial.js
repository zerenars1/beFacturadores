/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'facturador_ejecutivo_comercial',
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
      persona_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'persona',
          key: 'id',
        },
      },
      fecha_desde: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_hasta: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'ejecutivo_comercial',
      schema: 'facturador',
      underscored: true,
      timestamps: false,
    }
  );
};
