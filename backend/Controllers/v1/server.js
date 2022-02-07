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


app.listen(port, () => {
//   console.log(`server is running on PORT:${PORT}`);
    console.log('Fetching date please wait.................')
});

