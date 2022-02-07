
const movie = require("../../models/movie");
const rating = require("../../models/rating");
const comment = require("../../models/comment");
const episode = require("../../models/episode");
const actor = require("../../models/actor");
const {Op} = require("sequelize");

exports.createMovie= async (req, res, next) => {
    const movieData = req.body;
    try {
        movie.create({
            'name': movieData.name,
            'genre': movieData.genre,
            'description': movieData.description,
            'trailer_link': movieData.trailer_link,
            'image': movieData.image,
            'status': 'active',
        })

        res.send('Movie added to database successfully');
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }

}


exports.updateMovie =async (req, res) => {

    const id = req.params.id;

    try {

        let findMovie = await movie.findOne({where: {id: id}});
        if(!findMovie) {
            return res.status(500).json({
                'message': "Movie not found"
            })
        }

        await movie.update(req.body, {
            where: {
                id: id
            }
        });

        res.send("Details Updated successfully");

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}

exports.deleteMovie =async (req, res) => {

    const id = req.params.id;
    try {

        let findMovie = await movie.findOne({where: {id: id}});
        if(!findMovie) {
            return res.status(500).json({
                'message': "Movie not found"
            })
        }

        let deleteMovie = await movie.destroy({
            where: {
                id: id
            }
        });

        res.send("Movie Deleted successfully");

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}





exports.getMovies =async (req, res, next) => {
    try {
        // Find all movies
        const movies = await movie.findAll();
        res.json(movies);

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}


exports.getMovieById = async (req, res) => {

    const id = req.params.id;
    try {

        let movieDetails = await movie.findOne({
            where: {id: id} ,
            include: [
                {'model': rating},
                {'model': comment},
                {'model': episode},
                {'model': actor}
            ]
        });

        res.send(movieDetails);
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}
exports.searchMovie = async (req, res) => {

    const name = req.body.name;
    try {
        let searchMovie = await movie.findAll({
            where:
                { 'name': { [Op.like]: '%' + name + '%' }}

        });

        if(searchMovie.length ==0){
            res.send('No movie found  with the search');
        }else{
            res.send(searchMovie);
        }
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}