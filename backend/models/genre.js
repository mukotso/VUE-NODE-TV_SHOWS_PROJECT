const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const movie = require("../models/movie");
const genre = sequelize.define('genre', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description:DataTypes.STRING,
    status: DataTypes.STRING,
})


genre.hasMany(movie, {
    foreignKey: 'genre_id' ,onDelete: 'CASCADE'
});

module.exports = genre;