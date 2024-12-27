const express = require('express');
const app = express();
const fs = require("fs");
const userModel = require("./models/userModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    let allUsers = await userModel.find();
    res.render("read", {users: allUsers});
});

app.post('/create', async (req, res) => {
    let {name, email, img} = req.body;
    let createdUser = await userModel.create({
        name: name,
        email: email,
        img: img
    });
    res.redirect("/read");
});

app.get('/delete/:id', async (req,res) => {
    // let user = await userModel.findOneAndDelete({_id: req.params.id});
    let user = await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/read");
});

app.get('/edit/:id', async (req, res) => {
    let user = await userModel.findById(req.params.id);
    res.render("edit", {user: user});
});

app.post('/update/:id', async (req, res) => {
    let {name, email, img} = req.body;
    let user = await userModel.findOneAndUpdate(
        {_id: req.params.id},
        {name: name, email: email, img: img},
        {new: true}
    );
    res.redirect("/read");
});

// app.get('/create', async (req, res) => {
//     let createdUser = await userModel.create({
//         name: "aaruni2",
//         email: "aaruni2@gmail.com",
//         username: "aaruni2"
//     });

//     res.send(createdUser);
// });

// app.get('/update', async (req, res) => {
//     let updatedUser = await userModel.findOneAndUpdate(
//         {username: "aaruni"},
//         {name: "aaruni kale"},
//         {new: true}
//     );

//     res.send(updatedUser);
// });


// app.get('/delete', async (req, res) => {
//     let deletedUser = await userModel.findOneAndDelete({username: "aaruni2"});
//     res.send(deletedUser);
// });

// app.get('/files/:fileName', function(req, res) {
//     fs.readFile(`./files/${req.params.fileName}`, "utf-8", function(err, data) {
//         res.render('show', {
//             fileName: req.params.fileName,
//             data: data
//         });
//     });
// });

app.listen(3000);