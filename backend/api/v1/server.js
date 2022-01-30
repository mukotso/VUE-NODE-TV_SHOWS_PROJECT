
const jwt = require("jsonwebtoken");
const express = require('express')
const cors = require('cors');

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

app.use(cors());

var bodyParser = require('body-parser');


// Put these statements before you define any routes.
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


let users=[];

// login
app.post("/api/v1/login", (req, res) => {
    const loginDetails= req.body;

    let userDetails = users.find((user) => loginDetails.username == user.username);
    if(userDetails){
        if(userDetails.password==loginDetails.password){
            const user = userDetails;

            const token = jwt.sign(user, 'secret');
            res.json({
                token,
                user,
            });

        }
    }
    else {
        res.status(403);
        res.json({
            message: "wrong login information",
        });
    }

});





//register user
app.post('/api/v1/register', (req, res,next) => {
    const userData = req.body;
    let user = users.find((user) => userData.username == user.username);
    if(user){
        console.log("user already available");
        return;
    }
    else{
        users.unshift(userData);
        res.send('User added to database successfully');
    }

});