const dbgr = require("debug")("development:auth.controller");
const bcrypt = require('bcrypt');

const userModel = require('../models/user.model.js');
const { generateToken } = require('../utils/generateToken.util.js');

module.exports.registerUser = async (req, res) => {
    try {
        let {email, password, fullname} = req.body;
        let findUser = await userModel.findOne({email});
        if (findUser) {
            return res.status(402).send({message: "User already exists, please login"});
        };
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = await userModel.create({
            email,
            password: hashedPassword,
            fullname
        });
        let token = generateToken(user);
        res.status(201).cookie("token", token).send({message: "User created successfully", user});
    } catch (error) {
        dbgr(error.message);
        res.status(500).send(error.message);
    };
};

module.exports.loginUser = async (req, res) => {
    try {
        let {email, password} = req.body;
        let findUser = await userModel.findOne({email});
        if (!findUser) {
            return res.status(404).send({message: "User not found"});
        };
        let isPasswordMatch = await bcrypt.compare(password, findUser.password);
        if (!isPasswordMatch) {
            return res.status(401).send({message: "Invalid credentials"});
        };
        let token = generateToken(findUser);
        res.status(200).cookie("token", token).redirect("/shop");
    } catch (error) {
        dbgr(error.message);
        res.status(500).send(error.message);
    };
};

module.exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", "").redirect("/");
    } catch (error) {
        dbgr(error.message);
        res.status(500).send(error.message);
    };
};