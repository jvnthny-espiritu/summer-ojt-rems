const { EnvironmentReading, ResearchCenter } = require('../models');
const { Op } = require('sequelize');

// Get all reading
exports.getAllReadings = async (req, res) =>  {
    try {
        const reading = await EnvironmentReading.findAll();
        res.status(200).json(reading);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get reading by id
exports.getReadingById = async (req, res) => {
    try {
        const { id } = req.params;
        const reading = await EnvironmentReading.findByPk(id);
        if (reading) {
            res.status(200).json(reading);
        } else {
            res.status(404).json({ error: 'Reading not found' });
        }
    } catch (error) {
        res.status(500),json({ error: error.message });
    }
};

// Create reading
exports.createReading = async (req, res) => {
    try {
        const { humidity, temperature, researchCenterId } = req.body;
        if (!temperature || !humidity) {
            return res.status(400).json({ error: 'Missing required data' });
        }
        const reading = await EnvironmentReading.create({ humidity, temperature, researchCenterId });
        res.status(201).json(reading);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete reading
exports.deleteReading = async (req, res) => {
    try {
        const { id } = req.params;
        const reading = await EnvironmentReading.findByPk(id);
        if (reading) {
            await reading.destroy();
            res.status(204).json({ message: 'Reading deleted successfully'});
        } else {
            res.status(404).json({ error: 'Reading not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get latest reading in a research center 
exports.getLatestReading = async (req, res) => {
    const { researchCenterId } = req.params;
    try {
        const latestReading = await EnvironmentReading.findOne({
            where: { researchCenterId },
            order: [['createdAt', 'DESC']],
        });
        if (latestReading) {
            res.status(200).json(latestReading);
        } else {
            res.status(404).json({ error: 'No readings found for this research center' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};