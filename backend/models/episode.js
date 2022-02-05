const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const episode = sequelize.define('episodes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movie_id: DataTypes.INTEGER,
    title:DataTypes.STRING,
    description:DataTypes.STRING,
    episode_number: DataTypes.INTEGER,
    trailer_link:DataTypes.STRING,
});


//export
module.exports = episode;