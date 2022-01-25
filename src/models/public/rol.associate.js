module.exports = (db) => {
  db.rol.belongsToMany(db.usuario, {
    through: db.usuario_rol,
    as: 'usuarios',
    foreignKey: 'rol_id',
    otherKey: 'usuario_id',
  });

  db.rol.belongsTo(db.dashboard, {
    as: 'dashboard',
    foreignKey: 'dashboard_id',
  });

  db.rol.hasMany(db.rol_menu_dashboard, {
    foreignKey: 'rol_id',
    as: 'menu_dashboard',
  });

  db.rol.belongsToMany(db.menu_dashboard, {
    as: 'roles_for_menu_dashboard',
    through: db.rol_menu_dashboard,
    foreignKey: 'rol_id',
    otherKey: 'menu_dashboard_id',
  });
};
