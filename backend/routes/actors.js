
const express = require('express');
const router = express.Router();
const {createActor, deleteActor, updateActor} = require('../controllers/v1/actors_controller')



router.post('/create/:id', createActor);
router.post('/update/:id',  updateActor);
router.get('/delete/:id',  deleteActor);


module.exports = router;