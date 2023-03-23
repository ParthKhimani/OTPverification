const Sequelize = require('sequelize');

const sequelize = new Sequelize('Parth', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;