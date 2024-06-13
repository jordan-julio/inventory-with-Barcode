const model = require("../model/index");
const { Op } = require("sequelize");
const controller = {};
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

controller.getAll = async function (req, res) {
    try {
        const userData = await model.users.findAll();
        if (userData.length > 0) {
             res
                .status(200)
                .json({ message: "Connection successful", data: userData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.register = async function (req, res) {
    try {
        const { username, email, password } = req.body;
        console.table({
            username,
            email,
            password,
        })
        const userData = await model.users.create({
            username,
            email,
            password,
            isAdmin: false,
        });
        if (userData) {
            const token = jwt.sign(
                { name: userData.name, type: "member" },
                "JP:EREREASDAKSLKDA:LSKDL:",
            );
            res.status(200).json({
                message: "User registered successfully",
                data: userData,
                token,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
    }
}

controller.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const userData = await model.users.findOne({
            where: { email: email },
        });
        if (userData) {
            const validPassword = await bcrypt.compare(password, userData.password);
            if (validPassword) {
                // User authenticated, generate a JWT token
                const token = jwt.sign(
                    { name: userData.name, type: userData.isAdmin ? 'admin' : 'member' },
                    "JP:EREREASDAKSLKDA:LSKDL:",
                );

                res.status(200).json({
                    message: "User logged in successfully",
                    data: userData,
                    token: token,
                });
            } else {
                res.status(200).json({ message: "Invalid email or password" });
            }
        } else {
            res.status(200).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

module.exports = controller;