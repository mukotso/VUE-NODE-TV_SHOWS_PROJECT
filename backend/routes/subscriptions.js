const express = require('express');
const router = express.Router();

const {subscribeToMovie, unsubscribeFromMovie,mySubscriptions, activeSubscriptions} = require('../controllers/v1/subscriptions_controller')

router.get('/subscribe/:id', subscribeToMovie );
router.get('/view-active-subscriptions/:id',  activeSubscriptions)
router.get('/unsubscribe/:id',  unsubscribeFromMovie)
router.get('/my-subscriptions',  mySubscriptions)
module.exports = router;