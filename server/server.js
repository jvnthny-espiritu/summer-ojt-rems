const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db.config');
require('dotenv').config();

const researchCenterRoutes = require('./routes/researchCenter.route');
const equipmentRoutes = require('./routes/equipment.route');
const environmentReadingRoutes = require('./routes/environmentReading.route');
const authRoutes = require('./routes/auth.route');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(cors({
  origin: (origin, callback) => { 
    callback(null, true )
  },
}));

app.use('/api/research-centers', researchCenterRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/environment-readings', environmentReadingRoutes);
app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: false });
    console.log('Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();