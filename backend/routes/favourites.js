const express = require('express');
const router = express.Router();

const {createFavourite ,myFavourites,removeMovieFromFavourites} = require("../Controllers/v1/favourites_controller");

router.post('/make-favourite/:id', createFavourite);
router.post('/my-favourites', myFavourites);
router.post('/remove-from-favourites/:id', removeMovieFromFavourites);
module.exports = router;