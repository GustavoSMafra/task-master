const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Category = db.define('Category', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    color: { 
        type: DataTypes.STRING,
        require: true
    },
    icon: { 
        type: DataTypes.STRING,
        require: true
    }
});

module.exports = Category;
