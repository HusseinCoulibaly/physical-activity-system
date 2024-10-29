const Joi = require('joi');

// Schéma de validation pour les données de santé
const healthDataSchema = Joi.object({
  userId: Joi.string().required(),
  heartRate: Joi.number().min(30).max(220).required(),
  caloriesBurned: Joi.number().min(0).required(),
  steps: Joi.number().min(0).required(),
});

// Middleware de validation
const validateHealthData = (req, res, next) => {
  const { error } = healthDataSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateHealthData;
