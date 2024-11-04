const Notification = require('../models/Notification');
const NotificationPreference = require('../models/NotificationPreference');
const admin = require('../firebase-config'); // Firebase configuration
const nodemailer = require('nodemailer');
const axios = require('axios'); 
// Envoyer une notification push et l'enregistrer en base
exports.sendPushNotification = async (req, res) => {
  const { userId, message, type } = req.body;

  try {
    const preference = await NotificationPreference.findOne({ userId });

    if (!preference || !preference.types.includes(type) || !preference.channels.includes('push')) {
      return res.status(400).json({ message: 'Préférences utilisateur : notification non envoyée' });
    }

    const payload = {
      message: {
        topic: userId,
        notification: {
          title: "Rappel d'activité physique",
          body: message,
        },
      },
    };

    // Utilisation de l'API FCM via axios pour envoyer la notification push
    const response = await axios.post(
      `https://fcm.googleapis.com/v1/projects/${process.env.FCM_PROJECT_ID}/messages:send`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.FCM_SERVER_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Enregistrer la notification en base de données
    await Notification.create({ userId, message, type });

    res.status(200).json({ message: 'Notification push envoyée' });
  } catch (error) {
    console.error("Erreur d'envoi de la notification push:", error);
    res.status(500).json({ message: 'Erreur d’envoi de la notification push' });
  }
};

// Envoyer un email et l'enregistrer en base
exports.sendEmailNotification = async (req, res) => {
  const { userId, email, message, type } = req.body;

  try {
    const preference = await NotificationPreference.findOne({ userId });

    if (!preference || !preference.types.includes(type) || !preference.channels.includes('email')) {
      return res.status(400).json({ message: 'Préférences utilisateur : email non envoyé' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Rappel d'activité physique",
      text: message,
    };

    await transporter.sendMail(mailOptions);

    // Enregistrer la notification en base de données
    await Notification.create({ userId, message, type });

    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error("Erreur d'envoi de l'email:", error);
    res.status(500).json({ message: 'Erreur d’envoi de l’email' });
  }
};

// Récupérer les notifications d'un utilisateur
exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications :", error);
    res.status(500).json({ message: 'Erreur lors de la récupération des notifications' });
  }
};

// Marquer une notification spécifique comme lue
exports.markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: 'Notification non trouvée' });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la notification :", error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la notification' });
  }
};
