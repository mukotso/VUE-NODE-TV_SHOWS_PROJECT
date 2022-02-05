
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
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



//export
module.exports = comment;