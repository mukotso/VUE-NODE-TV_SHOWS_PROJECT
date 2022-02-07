const express = require('express');
const router = express.Router();

const {getUsers,createUser} = require('../controllers/v1/users_controller')


router.get('/', getUsers)
router.post('/create',  createUser)

module.exports = router;