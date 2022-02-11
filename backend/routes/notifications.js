const express = require('express');
const router = express.Router();

const {sendNotification} = require('../controllers/v1/notifications_controller')

router.post('/send-notification-to-subscribers/:id', sendNotification)

module.exports = router;