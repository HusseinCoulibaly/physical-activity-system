const express = require('express');
const { addHealthData, getHealthSummary, addMockHealthData } = require('../controllers/healthController');
const validateHealthData = require('../validators/healthValidator');
const router = express.Router();

// Route pour ajouter des données de santé mockées
router.post('/mock/add',validateHealthData ,addMockHealthData);

// Ajouter d'autres routes si nécessaire
router.post('/add', addHealthData,validateHealthData,); // Pour ajouter des données réelles
router.get('/:userId/summary', validateHealthData,getHealthSummary); // Pour obtenir un résumé des données

module.exports = router;
