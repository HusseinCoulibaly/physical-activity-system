const mongoose = require('mongoose');

const notificationPreferenceSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Associe l'utilisateur aux préférences
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  channels: { type: [String], enum: ['push', 'email'], default: ['push'] },
  types: { type: [String], enum: ['reminder', 'motivation', 'challenge'], default: ['reminder'] }
});

module.exports = mongoose.model('NotificationPreference', notificationPreferenceSchema);
