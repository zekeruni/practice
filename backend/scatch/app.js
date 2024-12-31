const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require("dotenv").config();
const expressSession = require('express-session');
const flash = require('connect-flash');

const connectDB = require('./db/db.connect.js');
const ownersRouter = require('./routes/owner.route.js');
const usersRouter = require('./routes/user.route.js');
const productsRouter = require('./routes/product.route.js');
const indexRouter = require('./routes/index.route.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(flash());
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);

connectDB()
.then(() => {
    app.listen(3000);
})
.catch((err) => {
    console.log("Mongodb connection error ",err);
});