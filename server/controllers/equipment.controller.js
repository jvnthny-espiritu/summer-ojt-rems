const { Equipment, ResearchCenter } = require('../models');

// Get all equipment
exports.getAllEquipment = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const equipment = await Equipment.findAll({ include: [{ model: ResearchCenter, as: 'researchCenter' }] });

        const paginatedEquipment = equipment.slice(startIndex, endIndex)
        res.status(200).json({sentEquipment: paginatedEquipment, totalPages: Math.ceil(equipment.length / limit)});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTypes = async (req, res) => {
    try {
        const equipment = await Equipment.findAll({ include: [{ model: ResearchCenter, as: 'researchCenter' }] });
        const uniqueTypes = [...new Set(equipment.map(device => device.type))]
        res.status(200).json(uniqueTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEquipmentByType = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const type = req.query.type
        const equipment = await Equipment.findAll({where: {type: type}, include: [{ model: ResearchCenter, as: 'researchCenter' }] });
        const paginatedEquipment = equipment.slice(startIndex, endIndex)
        res.status(200).json({sentEquipment: paginatedEquipment, totalPages: Math.ceil(equipment.length / limit)});
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
            equipment.type = type
            equipment.model = model
            equipment.serialNo = serialNo
            equipment.inventoryNo = inventoryNo
            equipment.status = status
            equipment.researchCenterId = researchCenterId
            await equipment.save();
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
            res.status(204).json({ message: 'Equipment deleted successfully'});
        } else {
            res.status(404).json({ error: 'Equipment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};