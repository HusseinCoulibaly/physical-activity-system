const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Importer les routes
app.use('/api/health', require('./routes/healthRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Health Analysis Service running on port ${PORT}`));
