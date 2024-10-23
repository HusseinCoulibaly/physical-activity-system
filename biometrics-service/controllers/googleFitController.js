const { google } = require('googleapis');
const { oauth2Client } = require('../config/googleAuth');

// Obtenir des données depuis Google Fit
// controllers/googleFitController.js
exports.getGoogleFitData = async (req, res) => {
    try {
      const fitness = google.fitness({ version: 'v1', auth: oauth2Client });
      
      const { userId } = req.params;
      
      // Exemple : Récupérer les données d'activité physique (calories brûlées)
      const response = await fitness.users.dataset.aggregate({
        userId: 'me', // ID 'me' pour désigner l'utilisateur authentifié
        requestBody: {
          aggregateBy: [
            {
              dataTypeName: 'com.google.calories.expended'
            }
          ],
          bucketByTime: { durationMillis: 86400000 }, // Bucket d'un jour
          startTimeMillis: Date.now() - (7 * 24 * 60 * 60 * 1000), // Dernière semaine
          endTimeMillis: Date.now(),
        }
      });
      
      res.json(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données Google Fit:', error); // Affiche l'erreur dans la console
      res.status(500).json({ message: 'Erreur lors de la récupération des données Google Fit', error: error.message || error }); // Retourne l'erreur détaillée
    }
  };
  
