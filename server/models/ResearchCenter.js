module.exports = (sequelize, DataTypes) => {
    const ResearchCenter = sequelize.define('ResearchCenter', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return ResearchCenter;
  };