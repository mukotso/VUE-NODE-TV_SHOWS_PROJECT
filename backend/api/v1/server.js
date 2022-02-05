const jwt = require("jsonwebtoken");
const express = require('express')
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt')

const nodemailer = require('nodemailer');
app.use(express.json())
const port = process.env.PORT || 3000;

app.use(cors());


//exports
const sequelize = require('../../config/database');
const user = require('../../models/user');
const { Op } = require("sequelize");
const movie = require('../../models/movie');
const subscription = require('../../models/subscription');
const rating =require('../../models/rating');
const genre = require ('../../models/genre');
const favourite = require('../../models/favourite');
const comment = require('../../models/comment');
const actor = require('../../models/actor');
const episode = require('../../models/episode');
//synchronize table on new changes
sequelize.sync({
    force: true,
    logging: console.log
})


var bodyParser = require('body-parser');

// Put these statements before you define any routes.
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

let users = [];

// login
app.post("/api/v1/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        let findUser = await user.findOne({where: {email: email}});


        if (!findUser) {
            return res.status(404).json({
                message: ' a user with the email address does not exist'
            })
        }
            let comparePassword = await bcrypt.compare(password, findUser.password);

            if (!comparePassword) {
                return res.status(401).json({
                    message: 'Your credentials did not match'
                })
            }

        const token = jwt.sign({
            email: findUser.email,
            userId: findUser.id
        }, 'secret')

        delete user['password'];

        return res.status(200).json({
            token,
            user
        })
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }

});


//register user
app.post('/api/v1/register', async (req, res, next) => {
    const userData = req.body;

    let hashedPassword = await bcrypt.hashSync(req.body.password, 2);
    let findEmail = await user.findOne({where: {email: userData.email}});
    if(findEmail){
        return res.status(500).json({
            'message': "Email already registered to the system"
        })
    }
    try {
        user.create({
            'name': userData.name,
            'tel': userData.tel,
            'email': userData.email,
            'id_number': userData.id_number,
            'password': hashedPassword,
            'role_id': 2,
            'status': 'active',
        })

        res.send('User added to database successfully');
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }

});


app.post('/api/v1/create/user', async (req, res, next) => {
    const userData = req.body;
    try {

        let findEmail = await user.findOne({where: {email: userData.email}});
        if(findEmail) {
            return res.status(500).json({
                'message': "Email already registered to the system"
            })
        }

        let randomPassword = createPassword(8);
        let randomHashedPassword = bcrypt.hashSync(randomPassword, 2);
        user.create({
            'name': userData.name,
            'tel': userData.tel,
            'email': userData.email,
            'id_number': userData.id_number,
            'password': randomHashedPassword,
            'role_id': 2,
            'status': 'active',
        })

        res.json(randomPassword);
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }

});


function createPassword(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


//register movie
app.post('/api/v1/create/movie', async (req, res, next) => {
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

});


app.put('/api/v1/movie/update-details/:id', async (req, res) => {


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
})


app.delete('/api/v1/movie/delete/:id', async (req, res) => {

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
})


app.get('/api/v1/users', async (req, res, next) => {
    try {
        // Find all users
        const users = await user.findAll();
        res.json(users);
    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }

});


app.get('/api/v1/movies', async (req, res, next) => {
    try {
        // Find all movies
        const movies = await movie.findAll();
        res.json(movies);

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
});


app.get('/api/v1/movie/:id', async (req, res) => {

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
})


app.post('/api/v1/movie/search/', async (req, res) => {

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
})


app.post('/api/v1/movie/subscribe/', async (req, res) => {

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
})


app.post('/api/v1/movie/un-subscribe/', async (req, res) => {

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
})








app.get('/api/v1/movie/my-subscriptions/:id', async (req, res) => {

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
})


app.post('/api/v1/movie/favourite/', async (req, res) => {

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
})



app.get('/api/v1/movie/my-favourites/:id', async (req, res) => {

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
})


app.get('/api/v1/movie/active-subscriptions', async (req, res) => {


    try {

        let favourites = await favourite.findAll({
            include: [
                {'model': movie}
            ]
        });
        if(!favourites) {
            return res.status(200).json({
                'message': "You have no active subscriptions"
            })
        }else{
            res.send(favourites);
        }

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
})


app.post('/api/v1/movie/rate/:id', async (req, res) => {

    const userId = req.body.user_id;
    const movieId = req.params.id;
    const Userrating =req.body.rating;
    try {
        let findMovie = await movie.findOne({where: {id: movieId}});
        let  isRated = await rating.findOne ({where: {id: movieId, user_id:userId}});
        if(isRated){
               return res.status(200).json({
                   'message': "You have already rated the movie"
               })
        }
        if(!findMovie) {
            return res.status(200).json({
                'message': "Movie not found"
            })
        }else{
            rating.create({
                'movie_id': movieId,
                'user_id': userId,
                'rating':Userrating
            })

            res.send("You have rated the movie successfully");
        }

    } catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
})

//genre
app.post('/api/v1/movie-genre', async (req, res) => {

    const genreData=req.body;
    try {
            genre.create({
               'name':genreData.name,
                'description':genreData.description,
                'status':"active"
            })
            res.send("Genre added Succesfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
})

//view genre
   app.get( '/api/v1/movie-genre', async ( req,res)=>{
       try{
           const activeGenre = await genre.findAll({where:{status:"active"}})      ;
           return res.send(activeGenre);

       }  catch (error)  {
           return res.status(500).json({
               'message':error.message
           })
       }
})









//genre   delete
app.post('/api/v1/movie-genre/delete/:id', async (req, res) => {

    const id=req.params.id;
    try {
        await genre.destroy(
            {
                where:{
                    id:id
                }
            }
        )
        res.send("genre deleted successfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
})

//update
app.post('/api/v1/movie-genre/update-details/:id', async (req, res) => {

    const genreData=req.body;
    const id=req.params.id;
    try {
        let findGenre = await genre.findOne({where: {id: id}});
        if(!findGenre){
            res.send("genre not found");
        }
        await genre.update(genreData, {
            where: {
                id: id
            }
        });
        res.send("genre updated successfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
})





//actors


//genre
app.post('/api/v1/movie/comment', async (req, res) => {

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

})


//actors


//create actor
app.post('/api/v1/movie/:id/actors', async (req, res) => {

    const actorData=req.body;
    const movieId =req.params.id;
    try {
        actor.create({
            'name':actorData.name,
            'avatar':actorData.avatar,
            'age':actorData.age,
            'movie_id':movieId,
            'place_of_birth':actorData.place_of_birth,
        })
        res.send("Actor added Succesfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
})


//actor
app.post('/api/v1/movie/actor/:id/delete', async (req, res) => {

    const id=req.params.id;
    try {
        await actor.destroy(
            {
                where:{
                    id:id
                }
            }
        )
        res.send("Actor deleted successfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
})

//update
app.post('/api/v1/movie/actor/:id/update-details/', async (req, res) => {

    const actorData=req.body;
    const id=req.params.id;
    try {
        await actor.update(actorData, {
            where: {
                id: id
            }
        });
        res.send("Actor details updated");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
})


//EPISODES
//create episode
app.post('/api/v1/movie/:id/episode', async (req, res) => {

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
})


//delete
app.post('/api/v1/movie/episode/:id/delete', async (req, res) => {

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
})

//update
app.post('/api/v1/movie/episode/:id/update-details', async (req, res) => {

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
})



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







app.post('/api/v1/send-notifications', async (req, res) => {

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "417be0f9409dbb",
            pass: "9a09d4efc330dd"
        }
    });



    var mailOptions = {
        from: '"Balozi Movies and Shows Team" <balozimovies@example.com>',
        to: 'subscribers@example.com',
        subject: 'LACASA SEASON  COMING SOON'
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









app.listen(port, () => {
//   console.log(`server is running on PORT:${PORT}`);
    console.log('Fetching date please wait.................')
});

