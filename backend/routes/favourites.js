const express = require('express');
const router = express.Router();

const {createFavourite ,myFavourites} = require("../Controllers/v1/favourites_controller");

router.post('/make-favourite/:id', createFavourite);
router.get('/my-favourites', myFavourites);
module.exports = router;