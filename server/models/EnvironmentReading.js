module.exports = (sequelize, DataTypes) => {
    const Reading = sequelize.define('EnvironmentReading', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      humidity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    }, {
      timestamps: true,
      updatedAt: false
    });
  
    return Reading;
  };