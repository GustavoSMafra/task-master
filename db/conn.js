const { Sequelize } = require('sequelize');

const sequelize = new  Sequelize('task_node', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Database connection success')
} catch(err) {
    console.log('Database connection error: ', err);
}

module.exports = sequelize;
