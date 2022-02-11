
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const actor = sequelize.define('actors', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    movie_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
});



//export
module.exports = actor;