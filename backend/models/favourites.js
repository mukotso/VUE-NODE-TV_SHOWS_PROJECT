const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const movie = require("../models/movies");
const user = require("../models/users");
const favourite = sequelize.define('favourites', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movie_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
})

favourite.belongsTo(movie, {
    foreignKey: 'movie_id' ,onDelete: 'CASCADE'
});

favourite.belongsTo(user, {
    foreignKey: 'user_id' ,onDelete: 'CASCADE'
});

//export
module.exports = favourite;