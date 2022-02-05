const movie =require('../models/movie')
const user =require('../models/user')
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const subscriptions = sequelize.define('subscriptions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movie_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
});

subscriptions.belongsTo(movie, {
    foreignKey: 'movie_id' ,onDelete: 'CASCADE'
});


subscriptions.belongsTo(user, {
    foreignKey: 'user_id' ,onDelete: 'CASCADE'
});

//export
module.exports = subscriptions;