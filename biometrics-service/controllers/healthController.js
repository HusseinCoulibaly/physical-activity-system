const HealthData = require('../models/HealthData');

// Ajouter des données de santé
exports.addHealthData = async (req, res) => {
  const { userId, heartRate, caloriesBurned, steps } = req.body;
  try {
    const healthData = await HealthData.create({ userId, heartRate, caloriesBurned, steps });
    res.status(201).json(healthData);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Analyser les données de santé
exports.getHealthSummary = async (req, res) => {
  const { userId } = req.params;
  try {
    const healthData = await HealthData.find({ userId });
    
    // Exemple d’analyse simple : moyenne des calories brûlées
    const totalCalories = healthData.reduce((acc, data) => acc + data.caloriesBurned, 0);
    const averageCalories = totalCalories / healthData.length;

    res.json({
      totalCalories,
      averageCalories,
      totalEntries: healthData.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
