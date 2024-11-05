const Feedback = require('../models/Feedback');


exports.addFeedback = async (req, res) => {
  const { userId, recommendationId, rating, comment } = req.body;
  try {
    const feedback = await Feedback.create({ userId, recommendationId, rating, comment });
    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la soumission du feedback' });
  }
};

exports.getFeedbacksByRecommendation = async (req, res) => {
  const { recommendationId } = req.params;
  try {
    const feedbacks = await Feedback.find({ recommendationId });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des feedbacks' });
  }
};
