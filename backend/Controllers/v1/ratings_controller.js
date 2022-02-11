const movie = require("../../models/movie");
const rating = require("../../models/rating");

exports.createRating= async (req, res) => {

    const userId = req.body.userId;
    const movieId = req.params.id;
    const UserRating =req.body.rating;
    try {
        let findMovie = await movie.findOne({where: {id: movieId}});
        let  isRated = await rating.findOne ({where: {movie_id: movieId, user_id:userId}});
        if(isRated){
            return res.status(500).json({
                'message': "You have already rated the movie"
            })
        }
        if(!findMovie) {
            return res.status(404).json({
                'message': "Movie not found"
            })
        }else{
            rating.create({
                'movie_id': movieId,
                'user_id': userId,
                'rating':UserRating
            })

            res.send("You have rated the movie successfully");
        }

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}