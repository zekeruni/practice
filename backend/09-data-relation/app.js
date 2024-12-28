const express = require('express');
const app = express();
const userModel = require('./models/user.model');
const postModel = require('./models/post.model');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/create', async (req, res) => {
    let user = await userModel.create({
        username: "zekeruni",
        email: "zekeruni@gmail",
        age: 22,
    });
    res.send(user);
});

app.get("/post/create", async (req, res) => {
    let post = await postModel.create({
        postData: "This is my first post",
        user: "67706fac41c1958eb29e32aa",
    });
    let user = await userModel.findOne({_id: "67706fac41c1958eb29e32aa"});
    user.posts.push(post._id);
    await user.save();
    res.send({user, post});
});

app.listen(3000);