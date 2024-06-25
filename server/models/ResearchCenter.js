module.exports = (sequelize, DataTypes) => {
  const ResearchCenter = sequelize.define('ResearchCenter', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return ResearchCenter;
};