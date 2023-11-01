const mongoose = require('mongoose');

// const mongoURI = process.env.MONGODB_STRING;

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_STRING);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = dbConnect;
