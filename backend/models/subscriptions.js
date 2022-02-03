const movie =require('../models/movies')
const user =require('../models/users')
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const subscription = sequelize.define('subscriptions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movie_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
});

subscription.belongsTo(movie, {
    foreignKey: 'movie_id' ,onDelete: 'CASCADE'
});

subscription.belongsTo(user, {
    foreignKey: 'user_id' ,onDelete: 'CASCADE'
});

//export
module.exports = subscription;