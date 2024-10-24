const HealthData = require('../models/HealthData');
const generateMockHealthData = require('../utils/mockData');

// Ajouter des données de santé mockées
exports.addMockHealthData = async (req, res) => {
  const { userId } = req.body;
  
  try {
    // Génération des données mockées
    const mockHealthData = generateMockHealthData(userId);

    // Enregistrement dans la base de données
    const healthData = await HealthData.create(mockHealthData);
    res.status(201).json(healthData);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
