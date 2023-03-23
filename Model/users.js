const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const user = sequelize.define('user1', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    emailId: Sequelize.STRING,
    contactNumber: Sequelize.STRING,
    password: Sequelize.STRING,
    confirmPassword: Sequelize.STRING,
    dateOfBirth: Sequelize.STRING,
    country: Sequelize.STRING,
});

module.exports = user;