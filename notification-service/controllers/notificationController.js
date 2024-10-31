const NotificationPreference = require('../models/NotificationPreference');
const admin = require('../firebase-config');
const nodemailer = require('nodemailer');


// Envoyer une notification push en tenant compte des préférences
exports.sendPushNotification = async (req, res) => {
  const { userId, message, type } = req.body;

  try {
    const preference = await NotificationPreference.findOne({ userId });

    // Vérifier si les préférences autorisent ce type de notification
    if (!preference || !preference.types.includes(type) || !preference.channels.includes('push')) {
      return res.status(400).json({ message: 'Préférences utilisateur : notification non envoyée' });
    }

    const payload = {
      notification: {
        title: "Rappel d'activité physique",
        body: message,
      },
    };

    // Envoyer la notification
    const response = await admin.messaging().sendToTopic(userId, payload);
    res.status(200).json({ message: 'Notification envoyée', response });
  } catch (error) {
    console.error("Erreur d'envoi de la notification:", error);
    res.status(500).json({ message: 'Erreur d’envoi de la notification' });
  }
};

// Envoyer un email en tenant compte des préférences
exports.sendEmailNotification = async (req, res) => {
  const { userId, email, message, type } = req.body;

  try {
    const preference = await NotificationPreference.findOne({ userId });

    if (!preference || !preference.types.includes(type) || !preference.channels.includes('email')) {
      return res.status(400).json({ message: 'Préférences utilisateur : notification non envoyée' });
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
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error("Erreur d'envoi de l'email:", error);
    res.status(500).json({ message: 'Erreur d’envoi de l’email' });
  }
};
