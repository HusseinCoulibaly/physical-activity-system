const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use('/api/health', require('./routes/healthRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Health Analysis Service running on port ${PORT}`));
