
const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const user = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    tel: DataTypes.BIGINT,
    email:{
        type:DataTypes.STRING,
        unique: true,
    } ,
    id_number: DataTypes.INTEGER,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
});

//export
module.exports = user;