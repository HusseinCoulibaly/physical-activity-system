const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes pour le feedback
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Feedback Service running on port ${PORT}`);
});
