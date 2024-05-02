const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelizeOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
}

if (process.env.DB_SSL === 'true') {
    sequelizeOptions.dialectOptions = {
        ssl: true
    };
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, sequelizeOptions);

try {
    sequelize.authenticate();
    console.log('Database connection success')
} catch(err) {
    console.log('Database connection error: ', err);
}

module.exports = sequelize;
