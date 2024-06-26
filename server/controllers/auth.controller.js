const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ResearchCenter, Admin } = require('../models');

const login = async (req, res, next) => {
    const { code, password } = req.body;
    try {
        const user = await ResearchCenter.findOne({ where: { code } }) || await Admin.findOne({ where: { code } });
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET || "your-secret-key", {
        expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    const { code, password } = req.body;
    try {
      const existingAdmin = await Admin.findOne({ where: { code } });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin with this username already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newAdmin = await Admin.create({
        code,
        password: hashedPassword,
      });
  
      res.status(201).json(newAdmin);
    } catch (error) {
      next(error);
    }
};

module.exports = {
  login,
  register
};
