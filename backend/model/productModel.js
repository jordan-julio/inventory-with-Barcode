const sequelize = require("sequelize");
const db = require("../config/database");
const Category = require("./categoryModel"); // Assuming you have a categoryModel.js file

var products = db.define(
    "products",
    {
        id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        category: {
            type: sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        },
        productName: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        price: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        description: {
            type: sequelize.STRING,
            allowNull: false
        },
        quantity: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        soldAt: {
            type: sequelize.DATE
        }
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // use createdAt/updateAt
        timestamps: true,
    }
);

module.exports = products;