module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define('Equipment', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inventoryNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('available', 'work-in-progress', 'for repair'),
      allowNull: false,
    },
  });
  return Equipment;
};