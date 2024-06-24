const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Equipment = require('./Equipment')(sequelize, Sequelize);
const ResearchCenter = require('./ResearchCenter')(sequelize, Sequelize);
const User = require('./User')(sequelize, Sequelize);

ResearchCenter.hasMany(Equipment, { as: 'Equipments' });
Equipment.belongsTo(ResearchCenter, {
  foreignKey: 'researchCenterId',
  as: 'researchCenter',
});

module.exports = {
  sequelize,
  Equipment,
  ResearchCenter,
  User,
};
