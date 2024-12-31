const mongoose = require("mongoose");
require("dotenv").config();
const dbgr = require("debug")("development:mongoose");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        dbgr(`MongoDB connected! DB host : ${connectionInstance.connection.host}`);
    } catch (error) {
        dbgr("MongoDB connection error", error);
        process.exit(1);
    };
};

module.exports = connectDB;