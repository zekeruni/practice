const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('./models/user.model.js');
const postModel = require('./models/post.model.js');
const multerConfig = require('./config/multer.config.js');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/register', async (req, res) => {
    let {username, email, password, age, name} = req.body;
    let user = await userModel.findOne({email});
    if (user) {
        return res.status(500).send("User already exists");
    };
    let hashedPassword = await bcrypt.hash(password, 10);
    let newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
        age,
        name
    });
    let token = jwt.sign({
        email: newUser.email,
        userId: newUser._id
    }, "secretKey");
    res.cookie("token", token).send(newUser);
});

app.get('/login', async (req, res) => {
    res.render("login");
});

app.post('/login', async (req, res) => {
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if (!user) {
        return res.status(500).send("User does not exist");
    };
    bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
            return res.status(500).redirect("/login");
        };
        let token = jwt.sign({
            email: user.email,
            userId: user._id
        }, "secretKey");
        res
        .status(200)
        .cookie("token", token)
        .redirect("/profile");
    });
});

app.get('/logout', async (req, res) => {
    res.cookie("token", "").redirect("/login");
});

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render("profile", {user});
});

app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    let post = await postModel.create({
        user: user._id,
        content: req.body.content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user");
    if (post.likes.indexOf(req.user.userId) === -1) {
        post.likes.push(req.user.userId);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userId), 1);
    };
    await post.save();
    res.redirect("/profile");
});

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id});
    res.render("edit", {post});
});

app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content: req.body.content});
    res.redirect("/profile");
});

app.get('/profile/upload', isLoggedIn, (req, res) => {
    res.render("profileImgUpload");
})

app.post('/upload', isLoggedIn, multerConfig.single("image"), async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    user.profilePic = req.file.filename;
    await user.save();
    res.redirect("/profile");
});

function isLoggedIn(req, res, next) {
    if (!req.cookies.token) {
        return res.send("You are not logged in");
    };
    let data = jwt.verify(req.cookies.token, "secretKey");
    req.user = data;
    next();
};

app.listen(3000);