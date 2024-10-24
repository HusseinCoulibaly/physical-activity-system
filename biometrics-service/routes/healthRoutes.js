const express = require('express');
const { addHealthData, getHealthSummary, addMockHealthData } = require('../controllers/healthController');

const router = express.Router();

// Route pour ajouter des données de santé mockées
router.post('/mock/add', addMockHealthData);

// Ajouter d'autres routes si nécessaire
router.post('/add', addHealthData); // Pour ajouter des données réelles
router.get('/:userId/summary', getHealthSummary); // Pour obtenir un résumé des données

module.exports = router;
