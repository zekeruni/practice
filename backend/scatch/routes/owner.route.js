const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner.model.js');

router.get('/', (req, res) => {
    res.send("Owner Route");
});

router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
        return res.status(403).send("You dont have permission to create a new owner");
    };
    let {fullname, email, password} = req.body;
    let owner = await ownerModel.create({
        fullname,
        email,
        password
    });
    res.status(201).send(owner);
});

router.get("/admin", async (req, res) => {
    let success = req.flash("success");
    res.render("createproducts", {success});
});

module.exports = router;