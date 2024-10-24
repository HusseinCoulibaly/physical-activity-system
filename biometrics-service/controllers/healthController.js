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

// Ajouter des données de santé réelles
exports.addHealthData = async (req, res) => {
  const { userId, heartRate, caloriesBurned, steps } = req.body;

  try {
    // Création d'un nouvel enregistrement de données de santé
    const healthData = await HealthData.create({
      userId,
      heartRate,
      caloriesBurned,
      steps,
      date: new Date(),
    });

    res.status(201).json(healthData);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir un résumé des données de santé
exports.getHealthSummary = async (req, res) => {
  const { userId } = req.params;

  try {
    // Récupération des données de santé pour l'utilisateur
    const healthData = await HealthData.find({ userId });

    if (!healthData.length) {
      return res.status(404).json({ message: 'Aucune donnée de santé trouvée pour cet utilisateur' });
    }

    // Exemple d'analyse : calcul des calories totales et moyennes
    const totalCalories = healthData.reduce((acc, data) => acc + data.caloriesBurned, 0);
    const averageCalories = totalCalories / healthData.length;

    const totalSteps = healthData.reduce((acc, data) => acc + data.steps, 0);
    const averageSteps = totalSteps / healthData.length;

    res.json({
      totalEntries: healthData.length,
      totalCalories,
      averageCalories,
      totalSteps,
      averageSteps,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
