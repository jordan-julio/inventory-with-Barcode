const model = require("../model/index");
const { Op } = require("sequelize");
const controller = {};
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// get users
controller.getAllUsers = async function (req, res) {
    try {
        const userData = await model.users.findAll({
            where: {
                isAdmin: false,
                deleted: false,
            },
            attributes: {
                exclude: ['password']
            },
        });
        if (userData.length > 0) {
            res
                .status(200)
                .json({ message: "Connection successful", data: userData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch {
        res.status(404).json({ message: error });
    }
}

controller.getOneUser = async function (req, res) {
    try {
        const { id } = req.params;
        const userData = await model.users.findOne({
            where: {
                id
            }
        });
        if (userData) {
            res.status(200).json({
                message: "Connection successful",
                data: userData,
            });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// get all product categories
controller.getAllCategories = async function (req, res) {
    try {
        const categoryData = await model.categories.findAll();
        if (categoryData.length > 0) {
            res.status(200).json({
                message: "Connection successful",
                data: categoryData,
                quantity: categoryData.length,
            });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// add 1 product category
controller.addOneCategory = async function (req, res) {
    try {
        const { categoryName, description } = req.body;
        const categoryData = await model.categories.create({
            categoryName,
            description,
        });
        if (categoryData) {
            res.status(200).json({
                message: "Category added successfully",
                data: categoryData,
            });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// edit 1 product category
controller.editOneCategory = async function (req, res) {
    try {
        const { id, categoryName, description } = req.body;
        const categoryData = await model.categories.update({
            categoryName,
            description,
        }, {
            where: {
                id
            }
        });
        if (categoryData) {
            res.status(200).json({
                message: "Category updated successfully",
                data: categoryData,
            });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// get 1 category details
controller.getOneCategory = async function (req, res) {
    try {
        const { id } = req.params;
        console.log(id);
        const categoryData = await model.categories.findOne({
            where: {
                id
            }
        });
        if (categoryData) {
            res.status(200).json({
                message: "Connection successful",
                data: categoryData,
            });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// edit one user password and username
controller.editOneUser = async function (req, res) {
    try {
        const { id, username, password } = req.body;
        const userData = await model.users.update({
            username,
            password,
        }, {
            where: {
                id,
                deleted: false,
            }
        });
        if (userData) {
            res.status(200).json({
                message: "User updated successfully",
                data: userData,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
    }

}

// delete one user by making delete to true
controller.deleteOneUser = async function (req, res) {
    try {
        const { id } = req.params;
        const userData = await model.users.update({
            deleted: true,
        }, {
            where: {
                id
            }
        });
        console.log(userData);
        if (userData) {
            res.status(200).json({
                message: "User deleted successfully",
                data: userData,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
    }
}

controller.registerNewUsersWithoutToken = async function (req, res) {
    try {
        const { username, email, password } = req.body;
        const userData = await model.users.create({
            username,
            email,
            password,
        });
        if (userData) {
            res.status(200).json({
                message: "User registered successfully",
                data: userData,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
    }
}

controller.changePassWordOneUser = async function (req, res) {
    try {
        const { id, password } = req.body;
        console.table({
            id,
            password,
        })
        const userData = await model.users.update({
            password,
        }, {
            where: {
                id
            }
        });
        if (userData) {
            res.status(200).json({
                message: "Password changed successfully",
                data: userData,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
    }
}

// get All products
controller.getAllProducts = async function (req, res) {
    try {
        const productData = await model.products.findAll();
        if (productData.length > 0) {
            res.status(200).json({
                message: "Connection successful",
                data: productData,
                quantity: productData.length,
            });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// add 1 product
controller.addOneProduct = async function (req, res) {
    try {
        const { category, productName, price, description, quantity } = req.body;
        const productData = await model.products.create({
            category,
            productName,
            price,
            description,
            quantity,
        });
        if (productData) {
            res.status(200).json({
                message: "Product added successfully",
                data: productData,
            });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// edit 1 product
controller.editOneProduct = async function (req, res) {
    try {
        const { id, category, productName, price, description, quantity } = req.body;
        const productData = await model.products.update({
            category,
            productName,
            price,
            description,
            quantity,
        }, {
            where: {
                id
            }
        });
        if (productData) {
            res.status(200).json({
                message: "Product updated successfully",
                data: productData,
            });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}


module.exports = controller;