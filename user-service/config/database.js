
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Création de l'instance Sequelize avec les informations de connexion
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Désactive les logs de requêtes SQL dans la console
  }
);

// Fonction pour tester la connexion
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion MySQL établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données MySQL:', error);
    process.exit(1); // Arrête le processus en cas d'erreur critique de connexion
  }
};

module.exports = { sequelize, connectDB };
