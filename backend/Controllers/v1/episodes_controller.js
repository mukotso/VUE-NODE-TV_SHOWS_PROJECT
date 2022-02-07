const subscription = require("../../models/subscription");
const user = require("../../models/user");
const episode = require("../../models/episode");

exports.createEpisode = async (req, res) => {

    const episodeData=req.body;
    const movieId =req.params.id;


    let subscribedUsers= await  subscription.findAll({where:{
            movie_id:movieId},
        include: [
            {'model': user }
        ]
    })
    try {
        episode.create({
            'title':episodeData.title,
            'description':episodeData.description,
            'episode_number':episodeData.episode_number,
            'movie_id':movieId,
            'trailer_link':episodeData.trailer_link,
        })

        // let subscribedUsers= await  subscription.findAll({where:{
        //      movie_id:movieId
        //     }})
        // let subscribedEmails=[];
        // var newEmail='';
        // subscribedEmails.forEach(user => {
        //     // subscribedEmails.push(user.user.email)
        //     finduser= user.findOne({where:{id:user.user_id}})
        // });
        // return res.send(newEmail);
        // var mailOptions = {
        //     from: '"Balozi Movies and Shows Team" <balozimovies@example.com>',
        //     subject: 'LACASA SEASON  EPISODE 19 ADDED',
        //     to: subscribedEmails,
        //     html:'<p>episodeData.title</p>',
        //     html: 'Watch the full trailer from the link below <br> <button style="background-color: darkolivegreen" >Trailer Link</button> <br> Regards Balozi movies and series',
        // };
        //
        //
        //
        // transport.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         // return consolele.log(error);
        //         return res.status(500).json({
        //             'message': error.message
        //         })
        //     }
        // });

        res.send("Episode added Succesfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}

exports.deleteEpisode= async (req, res) => {

    const id=req.params.id;
    try {
        await episode.destroy(
            {
                where:{
                    id:id
                }
            }
        )
        res.send("Episode deleted successfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}

exports.updateEpisode = async (req, res) => {

    const episodeData=req.body;
    const id=req.params.id;
    try {
        await episode.update(episodeData, {
            where: {
                id: id
            }
        });
        res.send("Episode details updated");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}



// create reusable transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//     port: 465,               // true for 465, false for other ports
//     host: "smtp.gmail.com",
//     auth: {
//         user: 'kelvinmukotso@gmail.com',
//         pass: 'password',
//     },
//     secure: true,
// });