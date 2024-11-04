const express = require('express');
const { addFeedback, getFeedbacksByRecommendation } = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', addFeedback); // Route pour ajouter un feedback
router.get('/:recommendationId', getFeedbacksByRecommendation); // Route pour récupérer les feedbacks d'une recommandation

module.exports = router;
