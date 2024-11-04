const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['reminder', 'motivation', 'challenge'], required: true },
  isRead: { type: Boolean, default: false }, // Non lue par défaut
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
