const express = require('express');
const router = express.Router();
const environmentReadingController = require('../controllers/environmentReading.controller');

router.get('/', environmentReadingController.getAllReadings);
router.get('/latest/:researchCenterId', environmentReadingController.getLatestReading);
router.post('/', environmentReadingController.createReading);
router.delete('/;id', environmentReadingController.deleteReading);

module.exports = router;    