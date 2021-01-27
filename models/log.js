const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('log', {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        definitions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        results: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Log;
};