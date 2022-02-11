const express = require('express');
const router = express.Router();

const { createEpisode, deleteEpisode, updateEpisode} = require('../controllers/v1/episodes_controller');

router.post('/create/:id',  createEpisode)
router.post('/update/:id',  updateEpisode)
router.get('/delete/:id',  deleteEpisode);

module.exports = router;