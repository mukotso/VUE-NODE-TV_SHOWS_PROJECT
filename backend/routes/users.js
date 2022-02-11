const express = require('express');
const router = express.Router();

const {getUsers,createUser,deleteUser} = require('../controllers/v1/users_controller')


router.get('/', getUsers)
router.post('/create',  createUser)
router.delete('/delete/:id',  deleteUser)
module.exports = router;