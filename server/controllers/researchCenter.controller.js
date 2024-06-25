const { ResearchCenter } = require('../models');
const bcrypt = require('bcrypt');

const getAllResearchCenters = async (req, res, next) => {
    try {
      const researchCenters = await ResearchCenter.findAll();
      res.status(200).json(researchCenters);
    } catch (error) {
      next(error);
    }
  };
  
  const getResearchCenterById = async (req, res, next) => {
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
  
  const createResearchCenter = async (req, res, next) => {
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
  
  const updateResearchCenter = async (req, res, next) => {
    const { id } = req.params;
    const { code, name, password } = req.body;
    try {
      const researchCenter = await ResearchCenter.findByPk(id);
      if (!researchCenter) {
        return res.status(404).json({ message: 'Research center not found' });
      }
  
      // Update fields
      researchCenter.code = code;
      researchCenter.name = name;
  
      // Update password if provided
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
  
  const deleteResearchCenter = async (req, res, next) => {
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
  
  module.exports = {
    getAllResearchCenters,
    getResearchCenterById,
    createResearchCenter,
    updateResearchCenter,
    deleteResearchCenter,
  };