// server.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

// Routes pour Google Fit
app.use('/api/googlefit', require('./routes/googleFitRoutes'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Google Fit Service running on port ${PORT}`));
