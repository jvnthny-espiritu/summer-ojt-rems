const express = require('express');
const router = express.Router();
const researchCenterController = require('../controllers/researchCenter.controller');

router.get('/', researchCenterController.getAllResearchCenters);
router.get('/:id', researchCenterController.getResearchCenterById);
router.post('/', researchCenterController.createResearchCenter);
router.put('/:id', researchCenterController.updateResearchCenter);
router.delete('/:id', researchCenterController.deleteResearchCenter);

router.get('/:id/equipments', researchCenterController.getEquipments);

module.exports = router;