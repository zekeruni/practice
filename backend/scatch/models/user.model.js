const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
});

module.exports = mongoose.model("user", userSchema);