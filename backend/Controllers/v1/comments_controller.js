const comment = require("../../models/comment");
const movie = require("../../models/movie");


exports.createComment =async (req, res) => {

    const commentData = req.body;

    let isCommented = await comment.findOne({where: {user_id: commentData.userId, movie_id: commentData.movieId}});
    let findMovie = await movie.findOne({where: {id: commentData.movieId}});

    if (isCommented) {
        return res.status(200).json({
            'message': "You have already commented on the movie"
        })
    }
    if(!findMovie){
        res.send("Movie not found");
    }
    try {
        comment.create({
            'comment': commentData.comment,
            'user_id': commentData.userId,
            'movie_id': commentData.movieId
        })
        res.send("Comment added Succesfully");

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }

}