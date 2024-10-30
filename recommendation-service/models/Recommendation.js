const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  activities: [{ type: String, required: true }], 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
