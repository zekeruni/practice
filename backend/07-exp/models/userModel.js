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
    name: String,
    email: String,
    img: String
});

module.exports = mongoose.model("user", userSchema);