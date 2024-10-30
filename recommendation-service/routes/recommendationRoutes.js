const express = require('express');
const { generateRecommendation, getRecommendations } = require('../controllers/recommendationController');

const router = express.Router();


router.post('/generate', generateRecommendation);


router.get('/:userId', getRecommendations);

module.exports = router;
