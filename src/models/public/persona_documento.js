/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'persona_documento',
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
      documento_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'documento_tipo',
          key: 'id',
        },
      },
      fecha_vencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'persona_documento',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
