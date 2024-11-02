const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
connectDB();

app.use(express.json());
app.use('/api/recommendations', require('./routes/recommendationRoutes'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Recommendation Service running on port ${PORT}`));

module.exports = app;
