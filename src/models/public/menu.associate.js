module.exports = (db) => {
  db.menu.belongsToMany(db.dashboard, {
    through: db.menu_dashboard,
    foreignKey: 'menu_id',
    otherKey: 'dashboard_id',
    as: 'dashboard',
  });

  db.menu.hasMany(db.menu_dashboard, {
    foreignKey: 'menu_id',
  });

  db.menu.belongsTo(db.menu, {
    as: 'parent',
    foreignKey: 'parent_id',
  });
};
