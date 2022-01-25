module.exports = (db) => {
  db.menu_dashboard.belongsTo(db.dashboard, {
    foreignKey: 'dashboard_id',
  });

  db.menu_dashboard.belongsTo(db.menu, {
    foreignKey: 'menu_id',
  });

  db.menu_dashboard.belongsToMany(db.rol, {
    as: 'roles',
    through: db.rol_menu_dashboard,
    foreignKey: 'menu_dashboard_id',
    otherKey: 'rol_id',
  });
};
