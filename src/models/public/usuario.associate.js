module.exports = (db) => {
  db.usuario.belongsTo(db.persona, {
    as: 'persona',
    foreignKey: 'persona_id',
  });

  db.usuario.belongsToMany(db.rol, {
    through: db.usuario_rol,
    as: 'roles',
    foreignKey: 'usuario_id',
    otherKey: 'rol_id',
  });

  db.usuario.hasMany(db.comercio_cuenta, {
    as: 'cuentas',
    foreignKey: 'usuario_alta_id',
  });

  db.usuario.hasMany(db.comercio_deposito, {
    as: 'usuario_alta',
    foreignKey: 'usuario_id',
  });

  db.usuario.hasMany(db.comercio_deposito, {
    as: 'usuario_confirmacion',
    foreignKey: 'usuario_confirmacion_id',
  });
};
