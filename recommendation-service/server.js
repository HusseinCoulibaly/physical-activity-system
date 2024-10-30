const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/recommendations', require('./routes/recommendationRoutes'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Recommendation Service running on port ${PORT}`));

module.exports = app;
