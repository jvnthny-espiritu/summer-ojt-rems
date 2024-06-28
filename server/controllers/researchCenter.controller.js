const { Model } = require('sequelize');
const { ResearchCenter, Equipment, sequelize } = require('../models');
const bcrypt = require('bcrypt');

// Get all research center
exports.getAllResearchCenters = async (req, res, next) => {
  try {
    const researchCenters = await ResearchCenter.findAll({ attributes: ['id', 'name', 'code', 'password'] });
    res.status(200).json(researchCenters);
  } catch (error) {
    next(error);
  }
};

// Get list of research centers
exports.getList = async (req, res, next) => {
  try {
    const list = await ResearchCenter.findAll({
      attributes: ['id', 'name']
    });
    if (!list) {
      return res.status(404).json( { message: 'No research centers found'});
    }
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

// Get research center by id
exports.getResearchCenterById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const researchCenter = await ResearchCenter.findByPk(id);
    if (!researchCenter) {
      return res.status(404).json({ message: 'Research center not found' });
    }
    res.status(200).json(researchCenter);
  } catch (error) {
    next(error);
  }
};

// Create research center
exports.createResearchCenter = async (req, res, next) => {
  const { code, name, password } = req.body
  try {
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newResearchCenter = await ResearchCenter.create({
      code,
      name,
      password: hashedPassword,
    });
    res.status(201).json(newResearchCenter);
  } catch (error) {
    next(error);
  }
};

// Update research center
exports.updateResearchCenter = async (req, res, next) => {
  const { id } = req.params;
  const { code, name, password } = req.body;
  try {
    const researchCenter = await ResearchCenter.findByPk(id);
    if (!researchCenter) {
      return res.status(404).json({ message: 'Research center not found' });
    }

    researchCenter.code = code || researchCenter.code;
    researchCenter.name = name || researchCenter.name;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      researchCenter.password = await bcrypt.hash(password, salt);
    }

    await researchCenter.save();

    res.status(200).json(researchCenter);
  } catch (error) {
    next(error);
  }
};

// Delete research center
exports.deleteResearchCenter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const researchCenter = await ResearchCenter.findByPk(id);
    if (!researchCenter) {
      return res.status(404).json({ message: 'Research center not found' });
    }
    await researchCenter.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Get equipment by research center
exports.getEquipments = async (req, res) => {
  const { id } = req.params;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const type = req.query.type

  try {
      if(type!=null){
        const equipment = await Equipment.findAll({where: {researchCenterId: id,type: type}, include: [{ model: ResearchCenter, as: 'researchCenter' }] });
        const paginatedEquipment = equipment.slice(startIndex, endIndex)
        res.status(200).json({sentEquipment: paginatedEquipment, totalPages: Math.ceil(equipment.length / limit)});
      } else{
        const researchCenter = await ResearchCenter.findByPk(id);
        if (!researchCenter) {
          return res.status(404),json({ message: 'Research center not found' });
        }
        const equipments =  await Equipment.findAll({
          where: { researchCenterId: id },
          attributes: [
            'type',
            'model'
          ],
          group: ['type', 'model']
        });
        if (!equipments) {
          return res.status(404),json({ message: 'No equipments in this research center' });
        }
        res.status(200).json(equipments);
      }
  } catch (error) {
      res.status(500).json({ error : error.message });
  }
};