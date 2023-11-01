const mongoose = require('mongoose');

// Define the OTP schema
const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: '10m',
        default: Date.now,
    },
});

// Create the OTP model
const OTPModel = mongoose.model('OTPModel', otpSchema);

module.exports = OTPModel;
