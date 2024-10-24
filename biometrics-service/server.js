// server.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());



const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(` Service running on port ${PORT}`));
