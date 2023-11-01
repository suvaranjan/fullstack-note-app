const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    pin:
    {
        type: String,
        trim: true
    },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
