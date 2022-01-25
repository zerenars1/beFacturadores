module.exports = (db) => {
  db.rol_menu_dashboard.belongsTo(db.rol, {
    as: 'rol',
    foreignKey: 'rol_id',
  });

  db.rol_menu_dashboard.belongsTo(db.menu_dashboard, {
    as: 'menu_dashboard',
    foreignKey: 'menu_dashboard_id',
  });
};
