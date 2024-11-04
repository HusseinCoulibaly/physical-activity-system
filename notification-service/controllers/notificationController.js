const Notification = require('../models/Notification');
const NotificationPreference = require('../models/NotificationPreference');
const admin = require('../firebase-config'); // Firebase configuration
const nodemailer = require('nodemailer');
const axios = require('axios');
const getMessage = require('../utils/notificationMessages');

// Envoyer une notification push personnalisée
exports.sendPushNotification = async (req, res) => {
  const { userId, type } = req.body;

  try {
    const preference = await NotificationPreference.findOne({ userId });
    if (!preference || !preference.types.includes(type) || !preference.channels.includes('push')) {
      return res.status(400).json({ message: 'Préférences utilisateur : notification non envoyée' });
    }

    const message = getMessage(type, preference.frequency); // Message personnalisé en fonction du type et de la fréquence

    const payload = {
      message: {
        topic: userId,
        notification: {
          title: "Notification Teccartfit",
          body: message,
        },
      },
    };

    await axios.post(
      `https://fcm.googleapis.com/v1/projects/${process.env.FCM_PROJECT_ID}/messages:send`,
      payload,
      {
        headers: {
          Authorization: `key=${process.env.FCM_SERVER_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    await Notification.create({ userId, message, type });
    res.status(200).json({ message: 'Notification push envoyée' });
  } catch (error) {
    console.error("Erreur d'envoi de la notification push:", error);
    res.status(500).json({ message: 'Erreur d’envoi de la notification push' });
  }
};


// Envoyer un email et l'enregistrer en base
exports.sendEmailNotification = async (req, res) => {
  const { userId, email, type } = req.body;

  try {
    const preference = await NotificationPreference.findOne({ userId });
    if (!preference || !preference.types.includes(type) || !preference.channels.includes('email')) {
      return res.status(400).json({ message: 'Préférences utilisateur : email non envoyé' });
    }

    const message = getMessage(type, preference.frequency); // Message personnalisé en fonction du type et de la fréquence

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
      subject: "Notification Teccartfit",
      text: message,
    };

    await transporter.sendMail(mailOptions);

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
