
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const user = require("../models/user");
const comment = sequelize.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movie_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    comment:DataTypes.STRING,
});


comment.belongsTo(user, {
    foreignKey: 'user_id' ,onDelete: 'CASCADE'
});

//export
module.exports = comment;