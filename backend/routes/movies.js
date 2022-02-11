const express = require('express');
const router = express.Router();

const {createMovie, updateMovie, getMovies, deleteMovie,getMovieById, searchMovie} = require('../controllers/v1/movies_controller')
const {getMovieSubscriptions} = require("../Controllers/v1/movies_controller");


router.get('/',  getMovies);
router.get('/:id',  getMovieById);
router.post('/search',  searchMovie);
router.get('/subscriptions/:id', getMovieSubscriptions);
router.post('/create',  createMovie);
router.put('/update/:id',  updateMovie);
router.delete('/delete/:id',  deleteMovie)


module.exports = router;