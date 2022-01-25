/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'transaccion_ticket',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      transaccion_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'transaccion',
          key: 'id',
        },
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn('now'),
      },
      ticket: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'nodata',
      },
    },
    {
      sequelize,
      tableName: 'transaccion_ticket',
      schema: 'procesadora',
      timestamps: false,
      underscored: true,
    }
  );
};
