const Sequelize = require('sequelize');
const sequelize = require('../config/db.config');
const Equipment = require('./Equipment')(sequelize, Sequelize);
const ResearchCenter = require('./ResearchCenter')(sequelize, Sequelize);
const Admin = require('./Admin')(sequelize, Sequelize);

ResearchCenter.hasMany(Equipment, { foreignKey: 'researchCenterId', as: 'equipments' });
Equipment.belongsTo(ResearchCenter, { foreignKey: 'researchCenterId', as: 'researchCenter' });

module.exports = {
  Equipment,
  ResearchCenter,
  Admin,
  sequelize,
};
