const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    gstin: String,
    picture: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
});

module.exports = mongoose.model("owner", ownerSchema);