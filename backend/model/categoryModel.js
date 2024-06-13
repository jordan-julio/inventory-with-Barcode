/*
const Category = sequelize.define('category', {
    categoryName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
});
*/

const sequelize = require("sequelize");
const db = require("../config/database");

var productCategory = db.define(
    "categories",
    {
        id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        categoryName: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: sequelize.STRING,
            allowNull: false
        }
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // use createdAt/updateAt
        timestamps: true,
    }
);

module.exports = productCategory;