const express = require('express');
const router = express.Router();

const {createRating} = require('../controllers/v1/ratings_controller')


router.post('/rate-movie/:id', createRating);

module.exports = router;