const movie = require("../../models/movie");
const favourite = require("../../models/favourite");
const user = require("../../models/user");
exports.createFavourite= async (req, res) => {

    const userId = req.body.user_id;
    const movieId = req.body.movie_id;
    try {

        let findMovie = await movie.findOne({where: {id: movieId}});
        if(!findMovie) {
            return res.status(200).json({
                'message': "Movie not found"
            })
        }else{
            favourite.create({
                'movie_id': movieId,
                'user_id': userId,
            })

            res.send("Movie added to your favourite list  successfully");
        }


    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}

exports.myFavourites= async (req, res) => {

    const id = req.params.id;
    try {

        let myFavourites = await favourite.findAll({
            where: {user_id: id} ,
            include: [
                {'model': movie},
                {'model': user}
            ]
        });
        if(!myFavourites) {
            return res.status(200).json({
                'message': "You have no favourite movie"
            })
        }else{
            res.send(myFavourites);
        }

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}