const sequelize = require("sequelize");
const db = require("../config/database");
var user = db.define(
    "users",
    {
        id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: sequelize.STRING },
        email: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        isAdmin: { type: sequelize.BOOLEAN, defaultValue: false },
        deleted: { type: sequelize.BOOLEAN, defaultValue: false }
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: true,
    }
);

module.exports = user;