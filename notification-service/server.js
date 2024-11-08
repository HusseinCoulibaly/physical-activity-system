const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');


const connectDB = require('./config/db'); // Si tu as une base de données pour stocker les préférences
dotenv.config();

const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use('/api/notifications', require('./routes/notificationRoutes'));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
