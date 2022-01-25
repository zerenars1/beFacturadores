/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'persona_imagen',
    {
      id: {
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
      nombre_archivo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ruta_archivo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      imagen_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'imagen_tipo',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'persona_imagen',
      schema: 'public',
      timestamps: false,
      underscored: true,
    }
  );
};
