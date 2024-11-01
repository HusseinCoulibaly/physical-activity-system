// server.js
const express = require('express');
const { connectDB, sequelize } = require('./config/database'); // Import de sequelize
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());


connectDB();
app.use(cors());


app.use('/api/users', require('./routes/userRoutes'));

// Démarrage du serveur et synchronisation de la base de données
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
  await sequelize.sync(); // Synchroniser les modèles avec la base de données
});
