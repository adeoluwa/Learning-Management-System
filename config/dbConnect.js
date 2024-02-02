const mongoose = require("mongoose");

// const dotenv = require('dotenv').config();
const dbConnect = () => {
    try {
        const connection = mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error(error);
    }
};

module.exports = dbConnect;