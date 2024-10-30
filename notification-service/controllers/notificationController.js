const admin = require('../firebase-config');
const nodemailer = require('nodemailer');

// Envoyer une notification push via FCM
exports.sendPushNotification = async (req, res) => {
  const { userId, message } = req.body;

  try {
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

// Envoyer un email de rappel via Nodemailer
exports.sendEmailNotification = async (req, res) => {
  const { email, message } = req.body;

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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error("Erreur d'envoi de l'email:", error);
    res.status(500).json({ message: 'Erreur d’envoi de l’email' });
  }
};
