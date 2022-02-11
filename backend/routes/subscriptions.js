const express = require('express');
const router = express.Router();

const {subscribeToMovie, unsubscribeFromMovie,mySubscriptions, activeSubscriptions} = require('../controllers/v1/subscriptions_controller')

router.post('/subscribe/:id', subscribeToMovie );
router.get('/view-active-subscriptions/:id',  activeSubscriptions)
router.get('/unsubscribe/:id',  unsubscribeFromMovie)
router.post('/my-subscriptions',  mySubscriptions)
module.exports = router;