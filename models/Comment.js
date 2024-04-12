const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = require('./User');
const Task = require('./Task');

const Comment = db.define('Comment', {
    text: {
        type: DataTypes.STRING,
        require: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    taskId: {
        type: DataTypes.INTEGER,
        references: {
            model: Task,
            key: 'id'
        }
    }
});

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Task.hasMany(Comment, { foreignKey: 'taskId' });
Comment.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = Comment;
