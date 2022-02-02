
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

//export
module.exports = movie;