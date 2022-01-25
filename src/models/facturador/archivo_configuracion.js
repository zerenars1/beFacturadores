/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'archivo_configuracion',
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
      sabado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      domingo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      feriado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      dias_sin_enviar: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hora_desde: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hora_hasta: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ultima_fecha_enviado: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'archivo_configuracion',
      schema: 'facturador',
      underscored: true,
      timestamps: false,
    }
  );
};
