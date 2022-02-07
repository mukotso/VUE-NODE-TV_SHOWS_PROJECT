const express = require('express');
const router = express.Router();

const {createRating} = require('../controllers/v1/ratings_controller')


router.post('/create-comment/:id', createRating);

module.exports = router;