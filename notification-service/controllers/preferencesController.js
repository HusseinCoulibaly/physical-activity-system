const NotificationPreference = require('../models/NotificationPreference');

// Créer ou mettre à jour les préférences de notification
exports.setPreferences = async (req, res) => {
  const { userId, frequency, channels, types } = req.body;

  try {
    const preference = await NotificationPreference.findOneAndUpdate(
      { userId },
      { frequency, channels, types },
      { new: true, upsert: true } // Met à jour ou crée si inexistant
    );

    res.status(200).json({ message: 'Préférences mises à jour', preference });
  } catch (error) {
    console.error("Erreur de mise à jour des préférences:", error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour des préférences' });
  }
};

// Obtenir les préférences de notification d'un utilisateur
exports.getPreferences = async (req, res) => {
  const { userId } = req.params;

  try {
    const preference = await NotificationPreference.findOne({ userId });
    if (!preference) {
      return res.status(404).json({ message: 'Aucune préférence trouvée pour cet utilisateur' });
    }
    res.status(200).json(preference);
  } catch (error) {
    console.error("Erreur lors de la récupération des préférences:", error);
    res.status(500).json({ message: 'Erreur lors de la récupération des préférences' });
  }
};
