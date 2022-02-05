const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
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

module.exports = genre;