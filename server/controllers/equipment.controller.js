const { Equipment, ResearchCenter } = require('../models');



// Get all equipment
exports.getAllEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findAll({ include: [{ model: ResearchCenter, as: 'researchCenter' }] });
        res.status(200).json(equipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get equipment by id
exports.getEquipmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await Equipment.findByPk(id, { include: [{ model: ResearchCenter, as: 'researchCenter' }] });
        if (equipment) {
            res.status(200).json(equipment);
        } else {
            res.status(404).json({ error: 'Equipment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new equipment
exports.createEquipment = async (req, res) => {
    try {
        const { type, model, serialNo, inventoryNo, status, researchCenterId } = req.body;
        const equipment = await Equipment.create({ type, model, serialNo, inventoryNo, status, researchCenterId });
        res.status(201).json(equipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update equipment
exports.updateEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, model, serialNo, inventoryNo, status, researchCenterId } = req.body;
        const equipment = await Equipment.findByPk(id);
        if (equipment) {
            await equipment.update({ type, model, serialNo, inventoryNo, status, researchCenterId });
            res.status(200).json(equipment);
        } else {
            res.status(404).json({ error: 'Equipment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete equipment
exports.deleteEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await Equipment.findByPk(id);
        if (equipment) {
            await equipment.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Equipment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};