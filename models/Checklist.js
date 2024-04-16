const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Task = require('./Task');

const Checklist = db.define('Checklist', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    done: {
        type: DataTypes.BOOLEAN,
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

Task.hasMany(Checklist, { foreignKey: 'taskId' });
Checklist.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = Checklist;
