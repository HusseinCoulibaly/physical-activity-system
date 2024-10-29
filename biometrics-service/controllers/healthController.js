
const HealthData = require('../models/HealthData'); 
const generateMockHealthData = require('../utils/mockData');
exports.addMockHealthData = async (req, res) => {
  const { userId } = req.body;

  try {
    const mockHealthData = generateMockHealthData(userId);
    const healthData = await HealthData.create(mockHealthData);
    res.status(201).json(healthData);
  } catch (error) {
    console.error(error); // Afficher l'erreur dans la console
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Ajouter des données de santé réelles
exports.addHealthData = async (req, res) => {
  const { userId, heartRate, caloriesBurned, steps } = req.body;

  try {
    const healthData = await HealthData.create({
      userId,
      heartRate,
      caloriesBurned,
      steps,
      date: new Date(),
    });
    res.status(201).json(healthData);
  } catch (error) {
    console.error(error); // Afficher l'erreur dans la console
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir un résumé des données de santé
exports.getHealthSummary = async (req, res) => {
  const { userId } = req.params;

  try {
    const healthData = await HealthData.find({ userId });

    if (!healthData.length) {
      return res.status(404).json({ message: 'Aucune donnée de santé trouvée pour cet utilisateur' });
    }

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
    console.error(error); // Afficher l'erreur dans la console
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
