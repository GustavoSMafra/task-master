const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const User = require('./User');
const Category = require('./Category');

const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        require: true
    },
    description: {
        type: DataTypes.STRING,
        require: true
    },
    deadline: {
        type: DataTypes.DATE,
        require: true
    },
    status: {
        type: DataTypes.INTEGER,
        require: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

Task.statusList = {
    CREATED: {
        code: 0,
        label: 'Criado'
    },
    WORKING: {
        code: 1,
        label: 'Trabalhando'
    },
    PAUSED: {
        code: 2,
        label: 'Em espera'
    },
    PENDING: {
        code: 3,
        label: 'Pendente'
    },
    DONE: {
        code: 4,
        label: 'Concluído'
    }
};

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Task, { foreignKey: 'categoryId' });
Task.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Task;
