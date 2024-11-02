const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
connectDB();

app.use(express.json());
app.use('/api/health', require('./routes/healthRoutes'));

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Health Analysis Service running on port ${PORT}`));
}

module.exports = app;
