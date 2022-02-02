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

const movie = require('../../models/movies');
//synchronize table on new changes
// sequelize.sync({
//     force: true,
//     logging: console.log
// })


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


app.listen(port, () => {
//   console.log(`server is running on PORT:${PORT}`);
    console.log('Fetching date please wait.................')
});

