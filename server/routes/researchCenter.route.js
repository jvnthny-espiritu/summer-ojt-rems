const express = require('express');
const router = express.Router();
const researchCenterController = require('../controllers/researchCenter.controller');

router.get('/', researchCenterController.getAllResearchCenters);
router.get('/list', researchCenterController.getList);
router.get('/:id', researchCenterController.getResearchCenterById);
router.get('/:id/equipments', researchCenterController.getEquipments);
router.post('/', researchCenterController.createResearchCenter);
router.put('/:id', researchCenterController.updateResearchCenter);
router.delete('/:id', researchCenterController.deleteResearchCenter);


module.exports = router;