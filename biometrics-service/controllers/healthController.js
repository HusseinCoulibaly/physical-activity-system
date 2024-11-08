
const HealthData = require('../models/HealthData'); 
const generateMockHealthData = require('../utils/mockData');
exports.addMockHealthData = async (req, res) => {
  const { userId } = req.body;

  try {
    const mockHealthData = generateMockHealthData(userId);
    const healthData = await HealthData.create(mockHealthData);
    res.status(201).json(healthData);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

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
    console.error(error); 
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


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

    const totalHeartRate = healthData.reduce((acc, data) => acc + data.heartRate, 0);
    const averageHeartRate = totalHeartRate / healthData.length;

    // Construire la liste des données de santé individuelles pour chaque jour
    const entries = healthData.map(data => ({
      date: data.date,
      caloriesBurned: data.caloriesBurned,
      steps: data.steps,
      heartRate: data.heartRate
    }));

    // Répondre avec les moyennes, les totaux, et les entrées individuelles
    res.json({
      totalEntries: healthData.length,
      totalCalories,
      averageCalories,
      totalSteps,
      averageSteps,
      totalHeartRate,
      averageHeartRate,
      entries 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

