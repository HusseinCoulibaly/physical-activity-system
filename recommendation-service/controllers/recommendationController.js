const Recommendation = require('../models/Recommendation');
const axios = require('axios');
const { spawn } = require('child_process');
let responseSent = false;

exports.generateRecommendation = async (req, res) => {
  const { userId } = req.body;
  let responseSent = false;

  try {
    const biometricsResponse = await axios.get(`http://localhost:5001/api/health/${userId}/summary`);
    const biometricsData = biometricsResponse.data;

    const { averageHeartRate, averageCalories, averageSteps } = biometricsData;

    if (averageHeartRate === undefined || averageCalories === undefined || averageSteps === undefined) {
      return res.status(400).json({ message: 'Données biométriques manquantes ou incorrectes' });
    }

    console.log('Features:', averageHeartRate, averageCalories, averageSteps);

    const pythonProcess = spawn('python', ['predict.py', averageHeartRate, averageCalories, averageSteps]);

    pythonProcess.stdout.on('data', async (data) => {
      if (!responseSent) {
        responseSent = true;
        const recommendedActivity = data.toString().trim();
        const recommendation = await Recommendation.create({
          userId,
          activities: [recommendedActivity],
        });
        res.status(201).json(recommendation);
      }
    });

    pythonProcess.stderr.on('data', (data) => {
      if (!responseSent) {
        responseSent = true;
        console.error(`Erreur dans le script Python: ${data}`);
        res.status(500).json({ message: 'Erreur lors de la génération de la recommandation' });
      }
    });

    pythonProcess.on('exit', (code) => {
      if (!responseSent && code !== 0) {
        responseSent = true;
        res.status(500).json({ message: 'Erreur dans l’exécution du modèle' });
      }
    });

  } catch (error) {
    if (!responseSent) {
      responseSent = true;
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la génération de la recommandation' });
    }
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
