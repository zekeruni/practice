const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config.js');
const productModel = require('../models/product.model.js');

router.post('/create', upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgColor, panelColor, textColor } = req.body;
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgColor,
            panelColor,
            textColor
        });
        req.flash("success", "product created successfully");
        res.redirect("/owners/admin");
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;