const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const User = require('./User');

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
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

User.hasMany(Category, { foreignKey: 'userId' });
Category.belongsTo(User, { foreignKey: 'userId' });

module.exports = Category;
