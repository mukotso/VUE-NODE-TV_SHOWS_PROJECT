const express = require('express');
const router = express.Router();

const {createGenre, viewGenres, updateGenre, deleteGenre} = require('../controllers/v1/genres_controller')

router.get('/',  viewGenres)
router.post('/create',  createGenre);
router.put('/update/:id',  updateGenre);
router.delete('/delete/:id',  deleteGenre)

module.exports = router;