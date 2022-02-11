const nodemailer = require("nodemailer");
const movie = require("../../models/movie");
const rating = require("../../models/rating");
const comment = require("../../models/comment");
const episode = require("../../models/episode");
const user = require("../../models/user");
const subscriptions =require('../../models/subscription');
exports.sendNotification = async (req, res) => {


    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "417be0f9409dbb",
            pass: "9a09d4efc330dd"
        }
    });

    const message =req.body.message;
    const movieId=req.params.id;
    const movieDetails = await movie.findOne({
        where: {id: movieId}});
    const movieSubscribers = await subscriptions.findAll({
        where:{movie_id:movieDetails.id},
        include: [
            {'model': user},
        ]
    });

    const totalSubscribers =movieSubscribers.length;
    if(totalSubscribers >0){
        movieSubscribers.forEach((sub)=>{
            var mailOptions = {
                from: '"MOVIE TRACKER  SUPPORT TEAM" <balozimovies@movieapp.com>',
                to: sub.user.email,
                subject: movieDetails.name + ' notifications',
                text:message,
            };
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    // return consolele.log(error);
                    return res.status(500).json({
                        'message': error.message
                    })
                }
                return res.status(200).json({
                    'message': 'Notifications sent to subscribers'
                })
            });
        })

    }








}