const movie = require("../../models/movie");
const favourite = require("../../models/favourite");
const user = require("../../models/user");
const subscription = require("../../models/subscription");
exports.createFavourite= async (req, res) => {

    const userId = req.body.userId;
    const movieId = req.params.id;

    let myFavourites = await favourite.findAll({
        where: {user_id: userId, movie_id:movieId} ,
    });
    if(myFavourites.length >= 1){
        return res.status(500).json({
            'message': "Movie Already added to favourites list"
        })

    }

    try {

        let findMovie = await movie.findOne({where: {id: movieId}});
        if(!findMovie) {
            return res.status(500).json({
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

    // const id = req.params.id;
    const id = req.body.userId;
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

exports.removeMovieFromFavourites = async (req, res) => {

    const userId = req.body.userId;
    const movieId = req.params.id;
    try {


            await favourite.destroy({
                where: {
                    user_id: userId,
                    movie_id: movieId
                }
            });

            res.send("Movie Removed from favourites Successfully");


    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}