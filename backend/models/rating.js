const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const rating = sequelize.define('ratings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movie_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    rating:DataTypes.INTEGER
})

module.exports = rating;