const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n MongoDB connected ! DB host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
};

connectDB();

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    name: String,
    password: String,
    profilePic: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
});

module.exports = mongoose.model("user", userSchema);