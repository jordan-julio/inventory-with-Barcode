const userController = require("./userController");
const adminController = require("./adminController");

let controllers = {};
controllers.users = userController;
controllers.admins = adminController;
module.exports = controllers;