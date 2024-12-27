const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://zekeruni:278278@cluster0.yrnee.mongodb.net/vidtube`);
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