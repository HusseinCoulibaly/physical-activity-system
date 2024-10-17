const express = require('express');
const { addHealthData, getHealthSummary } = require('../controllers/healthController');

const router = express.Router();

router.post('/add', addHealthData); // Ajouter des données de santé
router.get('/:userId/summary', getHealthSummary); // Obtenir un résumé des données de santé

module.exports = router;
