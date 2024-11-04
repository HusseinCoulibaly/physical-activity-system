const express = require('express');
const {
  sendPushNotification,
  sendEmailNotification,
  getUserNotifications,        // Importer la fonction pour récupérer les notifications d'un utilisateur
  markNotificationAsRead       // Importer la fonction pour marquer une notification comme lue
} = require('../controllers/notificationController');
const {
  setPreferences,
  getPreferences,
} = require('../controllers/preferencesController');

const router = express.Router();

// Envoi de notifications
router.post('/send-push', sendPushNotification);
router.post('/send-email', sendEmailNotification);

// Récupérer les notifications d'un utilisateur
router.get('/:userId', getUserNotifications);  // Nouvelle route pour récupérer les notifications

// Marquer une notification spécifique comme lue
router.put('/:notificationId/read', markNotificationAsRead);  // Nouvelle route pour marquer comme lue

// Gestion des préférences de notifications
router.post('/preferences', setPreferences); // Pour créer ou mettre à jour les préférences
router.get('/preferences/:userId', getPreferences); // Pour obtenir les préférences d'un utilisateur

module.exports = router;
