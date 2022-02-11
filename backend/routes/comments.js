const express = require('express');
const router = express.Router();

const {createComment} = require('../controllers/v1/comments_controller')


router.post('/make-comment/:id', createComment);

module.exports = router;