const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipment.controller');

router.get('/', equipmentController.getAllEquipment);
router.get('/types', equipmentController.getTypes);
router.get('/specific', equipmentController.getEquipmentByType);
router.get('/:id', equipmentController.getEquipmentById);
router.post('/', equipmentController.createEquipment);
router.put('/:id', equipmentController.updateEquipment);
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;