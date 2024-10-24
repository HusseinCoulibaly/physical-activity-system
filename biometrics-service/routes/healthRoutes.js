const express = require('express');
const { addHealthData, getHealthSummary, addMockHealthData } = require('../controllers/healthController');

const router = express.Router();

router.post('/add', addHealthData); // Ajouter des données réelles (si un jour on intègre les API)
router.get('/:userId/summary', getHealthSummary); // Obtenir un résumé des données de santé
router.post('/mock/add', addMockHealthData); // Ajouter des données de santé mockées

module.exports = router;
