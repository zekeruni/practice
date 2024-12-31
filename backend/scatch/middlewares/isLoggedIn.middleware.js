const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model.js');

module.exports.isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "You are not logged in");
        return res.redirect("/");
    };
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        let user = await userModel.findOne({email: decoded.email}).select("-password");
        req.user = user;
        next();
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/");
    };
};