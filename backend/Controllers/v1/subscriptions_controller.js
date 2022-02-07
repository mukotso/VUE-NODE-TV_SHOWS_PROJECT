const movie = require("../../models/movie");
const subscription = require("../../models/subscription");
const user = require("../../models/user");
const favourite = require("../../models/favourite");
exports.subscribeToMovie =async (req, res) => {

    const userId = req.body.user_id;
    const movieId = req.body.movie_id;
    try {

        let findMovie = await movie.findOne({where: {id: movieId}});
        if(!findMovie) {
            return res.status(500).json({
                'message': "Movie not found"
            })
        }else{
            subscription.create({
                'movie_id': movieId,
                'user_id': userId,
            })

            res.send("Subscribed for updates  successfully");
        }

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}


exports.unsubscribeFromMovie = async (req, res) => {

    const userId = req.body.user_id;
    const movieId = req.body.movie_id;
    try {

        let findMovie = await movie.findOne({where: {id: movieId}});
        if(!findMovie) {
            return res.status(500).json({
                'message': "Movie not found"
            })
        }else{
            await subscription.destroy({
                where: {
                    user_id: userId,
                    movie_id: movieId
                }
            });

            res.send("Unsubscribed succesfully");
        }

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}


exports.mySubscriptions = async (req, res) => {

    const id = req.params.id;
    try {

        let mySubscriptions = await subscription.findAll({
            where: {user_id: id} ,
            include: [
                {'model': movie},
                {'model': user}
            ]
        });
        if(!mySubscriptions) {
            return res.status(200).json({
                'message': "You have no subscriptions"
            })
        }else{
            res.send(mySubscriptions);
        }

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}


exports.activeSubscriptions = async (req, res) => {
    try {

        let subscriptions = await subscription.findAll({
            include: [
                {'model': movie}
            ]
        });
        if(!subscriptions) {
            return res.status(200).json({
                'message': "You have no active subscriptions"
            })
        }else{
            res.send(subscriptions);
        }

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}