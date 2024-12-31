const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/isLoggedIn.middleware.js');
const productModel = require('../models/product.model.js');
const userModel = require('../models/user.model.js');

router.get('/', async (req, res) => {
    let error = req.flash("error");
    res.render("index", {error, loggedIn: false});
});

router.get('/shop', isLoggedIn, async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success")
    res.render("shop", { products, success });
});

router.get('/addtocart/:productId', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success", "Product added to cart");
    res.redirect("/shop");
});

router.get('/cart', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    res.render("cart", { user });
});

module.exports = router;