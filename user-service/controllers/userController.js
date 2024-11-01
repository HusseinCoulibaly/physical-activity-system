// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Inscription
exports.registerUser = async (req, res) => {
  const { name, email, password, dob, goals } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    const user = await User.create({ name, email, password, dob, goals });

    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou le service que tu utilises (ex: Yahoo, Outlook)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Options de l'email de confirmation
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmation d'inscription",
      text: `Bonjour ${name},\n\nVotre inscription a été réussie ! Bienvenue dans la famille teccfit 🎉😊👍.\n\nMerci,\nL'équipe`,
    };

    // Envoyer l'email de confirmation
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Utilisateur créé avec succès, un email de confirmation a été envoyé.' });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
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
    console.error('Erreur de connexion :', error);
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

exports.checkSession = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Non autorisé, token manquant" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie le token

    res.status(200).json({ user: decoded });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Gestion spécifique du cas de l'expiration
      return res.status(401).json({ message: "Session expirée, veuillez vous reconnecter" });
    }
    res.status(401).json({ message: "Token invalide" });
  }
};
// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Exclure le mot de passe des résultats
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({ message: "Déconnexion réussie" });
};
