const rating =require('../models/rating');
const comment =require('../models/comment');
const actor =require('../models/actor');
const episode =require('../models/episode');
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const movie = sequelize.define('movies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    genre: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    trailer_link: DataTypes.STRING,
    image_path: DataTypes.INTEGER,
    status: DataTypes.STRING,
});

movie.hasMany(rating, {
    foreignKey: 'movie_id' ,onDelete: 'CASCADE'
});

movie.hasMany(comment, {
    foreignKey: 'movie_id' ,onDelete: 'CASCADE'
});



movie.hasMany(episode, {
    foreignKey: 'movie_id' ,onDelete: 'CASCADE'
});

movie.hasMany(actor, {
    foreignKey: 'movie_id' ,onDelete: 'CASCADE'
});

//export
module.exports = movie;