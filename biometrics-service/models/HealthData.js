const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  heartRate: { type: Number, required: true }, // Fréquence cardiaque
  caloriesBurned: { type: Number, required: true }, // Calories brûlées
  steps: { type: Number, required: true }, // Nombre de pas
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthData', healthDataSchema);
