const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: (origin, callback) => { 
    callback(null, true )
  },
}));
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}));



sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running`);
  });
});