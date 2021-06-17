const Sequelize = require('sequelize')

const sequelize = new Sequelize("postgres://postgres:One2three@localhost:5432/WorkoutLog")

module.exports = sequelize