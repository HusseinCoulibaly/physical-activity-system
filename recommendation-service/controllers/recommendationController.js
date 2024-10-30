
const Recommendation = require('../models/Recommendation');
const axios = require('axios');
require('dotenv').config();

exports.generateRecommendation = async (req, res) => {
  const { userId, goals } = req.body;

  try {
    // Définir le token JWT (à remplacer par un vrai token valide pour l'utilisateur)
    const token = process.env.USER_JWT_TOKEN; // Assurez-vous d'avoir un token valide dans le fichier .env

    // Effectuer la requête vers biometrics-service avec le token dans l'en-tête Authorization
    const biometricsResponse = await axios.get(`http://localhost:5001/api/health/${userId}/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const biometricsData = biometricsResponse.data;

    // Logique de recommandation simplifiée
    let activities = [];
    if (goals === 'perte de poids') {
      activities = ['cardio', 'course à pied', 'marche rapide'];
    } else if (goals === 'prise de muscle') {
      activities = ['musculation', 'haltérophilie', 'crossfit'];
    } else if (goals === 'amélioration cardio') {
      activities = ['course', 'vélo', 'natation'];
    }

    // Sauvegarde de la recommandation
    const recommendation = await Recommendation.create({ userId, activities });
    res.status(201).json(recommendation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la génération de la recommandation' });
  }
};

exports.getRecommendations = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const recommendations = await Recommendation.find({ userId });
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des recommandations' });
    }
  };
