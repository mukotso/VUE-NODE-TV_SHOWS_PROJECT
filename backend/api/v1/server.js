const jwt = require("jsonwebtoken");
const express = require('express')
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt')
app.use(express.json())
const port = process.env.PORT || 3000;

app.use(cors());


//exports
const sequelize = require('../../config/database');
const user = require('../../models/users');
const { Op } = require("sequelize");
const movie = require('../../models/movies');
const subscription = require('../../models/subscriptions');

const favourite = require('../../models/favourites');
//synchronize table on new changes
sequelize.sync({
    alter: true,
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


app.post('/api/v1/movie/search/', async (req, res) => {

    const name = req.body.name;
    try {
        let searchMovie = await movie.findAll({
            where:
                    { 'name': { [Op.like]: '%' + name + '%' }}

        });

        if(searchMovie.length ==0){
            res.send('No movie found  with the serach');
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
                {'model': movie,user
                }
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
                {'model': movie}
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







app.listen(port, () => {
//   console.log(`server is running on PORT:${PORT}`);
    console.log('Fetching date please wait.................')
});

