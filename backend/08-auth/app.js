// IMPORTS-------------------------------------------------------------------------------------------------------------------------------------
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('./models/user.model');

// MIDDLEWARES-------------------------------------------------------------------------------------------------------------------------------------
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("index");
    // let token = jwt.sign({
    //     email: "zekeruni@gmail.com"
    // }, "secret");
    // console.log(token)
    // const password = {
    //     og: "278278",
    //     hashed: "$2b$10$bmdxf1hktPXl6PsXMCwLYeA4R.33l7J8UftIcq6fEnGy7QLQrf6Ui"
    // };
    // console.log("Password before:",password);
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(password.og, salt, (err, hash) => {
    //         password.hashed = hash;
    //         console.log("Hashed password:",hash);
    //         console.log("Password after:",password);
    //     });
    // });
    // bcrypt.compare(password.og, password.hashed, (err, result) => {
    //     console.log(result);
    // });
    // res.cookie("token", token).send({token});
});

app.post('/create', async (req, res) => {
    let {username, email, password, age} = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        age
    });

    let token = jwt.sign({email}, "secret");
    res
        .cookie("token", token)
        .send(user);
});

app.get("/logout", async (req, res) => {
    res
        .cookie("token", "")
        .redirect("/");
});

app.listen(3000);