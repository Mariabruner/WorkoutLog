const { DataTypes, STRING } = require("sequelize")
const db = require("../db")

const WorkOut = db.define("workout", {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    definition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = WorkOut