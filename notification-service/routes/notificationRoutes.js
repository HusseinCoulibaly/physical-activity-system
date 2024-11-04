const express = require('express');
const {
  sendPushNotification,
  sendEmailNotification,
} = require('../controllers/notificationController');
const {
  setPreferences,
  getPreferences,
} = require('../controllers/preferencesController');

const router = express.Router();

// Envoi de notifications
router.post('/send-push', sendPushNotification);
router.post('/send-email', sendEmailNotification);

// Gestion des préférences de notifications
router.post('/preferences', setPreferences); // Pour créer ou mettre à jour les préférences
router.get('/preferences/:userId', getPreferences); // Pour obtenir les préférences d'un utilisateur

module.exports = router;
