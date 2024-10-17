// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Inscription
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'Utilisateur déjà enregistré' });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Connexion
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await user.matchPassword(password)) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Identifiants invalides' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mise à jour de l'utilisateur
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, goals } = req.body;
  
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.goals = goals || user.goals;

    await user.save();

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      goals: user.goals,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Suppression de l'utilisateur
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    await user.destroy();
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
