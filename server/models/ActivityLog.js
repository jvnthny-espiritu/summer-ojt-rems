module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('ActivityLog', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "anonymous"
      },
      action: {
        type: DataTypes.ENUM('added', 'updated', 'deleted'),
        allowNull: false,
      },
      details: {
        type: DataTypes.JSON,
        allowNull: true
      }
    }, {
      timestamps: true,
      updatedAt: false
    });
    return Log;
  };    