module.exports = (db) => {
  db.dashboard.belongsToMany(db.menu, {
    through: db.menu_dashboard,
    foreignKey: 'dashboard_id',
    otherKey: 'menu_id',
    as: 'menu',
  });

  db.dashboard.hasMany(db.menu_dashboard, {
    foreignKey: 'dashboard_id',
    as: 'configuracion',
  });

  db.dashboard.hasMany(db.rol, {
    foreignKey: 'dashboard_id',
  });
};
