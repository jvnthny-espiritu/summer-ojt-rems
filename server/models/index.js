const Sequelize = require('sequelize');
const sequelize = require('../config/db.config');
const Equipment = require('./Equipment')(sequelize, Sequelize);
const ResearchCenter = require('./ResearchCenter')(sequelize, Sequelize);
const EnvironmentReading = require('./EnvironmentReading')(sequelize, Sequelize);
const EquipmentLog = require('./EquipmentLog')(sequelize, Sequelize);
const ActivityLog = require('./ActivityLog')(sequelize, Sequelize);
const Admin = require('./Admin')(sequelize, Sequelize);

ResearchCenter.hasMany(Equipment, { foreignKey: 'researchCenterId', as: 'equipments' });
Equipment.belongsTo(ResearchCenter, { foreignKey: 'researchCenterId', as: 'researchCenter' });

ResearchCenter.hasMany(EnvironmentReading, { foreignKey: 'researchCenterId', as: 'readings' });
EnvironmentReading.belongsTo(ResearchCenter, { foreignKey: 'researchCenterId', as: 'researchCenter' });

ResearchCenter.hasMany(ActivityLog, { foreignKey: 'researchCenterId', as: 'userLogs' });
ActivityLog.belongsTo(ResearchCenter, { foreignKey: 'researchCenterId', as: 'researchCenter' });

Equipment.hasMany(EquipmentLog, { foreignKey: 'equipmentId', as: 'logs' });
EquipmentLog.belongsTo(Equipment, { foreignKey: 'equipmentId', as: 'equipment' });

module.exports = {
  Equipment,
  ResearchCenter,
  EnvironmentReading,
  Admin,
  sequelize,
};
