const express = require('express');
const { sendPushNotification, sendEmailNotification } = require('../controllers/notificationController');

const router = express.Router();

router.post('/send-push', sendPushNotification);
router.post('/send-email', sendEmailNotification);

module.exports = router;
