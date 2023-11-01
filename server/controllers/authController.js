const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const randomOTP = require('../utils/generateOTP');
const OTPModel = require("../models/OTPmodel.js");


//-------------Signup--------------

const verifyUser = async (req, res, next) => {
    const { email } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (!userExists) return res.status(400).json({ message: "User not Found !!!" });
        next()
    } catch (error) {
        return res.status(400).json({ message: "Authentication Error!!!" });
    }
}

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({ message: "User already Signup !!!" })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            password: hashPassword,
        })

        return res.status(201).json({ message: "Signup Successfull" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

//-------------Signin--------------

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(400).json({ message: "User not found !!!" })
        }

        const isPasswordMatch = await bcrypt.compare(password, userExists.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = await jwt.sign(
            {
                userId: userExists._id, email: userExists.email
            }, process.env.SECRET_KEY,
            {
                expiresIn: '1h'
            },
        )
        return res.status(200).json({ message: "Signin successful", email: userExists.email, token });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

//-------------forgotPassword--------------


const generateOTP = async (req, res) => {
    const { email } = req.body;
    try {
        let existingOTP = await OTPModel.findOne({ email });

        if (existingOTP) {
            const { email, otp } = existingOTP;
            return res.status(200).json({ email, OTP: otp });
        }

        const generatedOTP = randomOTP();
        await OTPModel.create({
            email,
            otp: generatedOTP,
        });
        return res.status(200).json({ email, OTP: generatedOTP });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


//-------------verifyOtp-----------------

const verifyOTP = async (req, res) => {
    const { email: userEmail, OTP: userOTP } = req.body;

    try {
        const { email: dbEmail, otp: dbOTP } = await OTPModel.findOne({ email: userEmail });

        if (userOTP === dbOTP) {
            await OTPModel.deleteOne({ email: dbEmail });
            req.app.locals.resetSession = true; // Start Session for reset Password
            return res.status(200).json({ message: "OTP Verified!!" })
        } else {
            return res.status(400).json({ message: "Invalid OTP!!" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ Error: "An internal server error." });

    }
}
//--------- Successfully redirect when OTP is verified -----
const createResetSession = (req, res) => {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false;
        return res.status(201).json({ message: "Access Granted" })
    }
    return res.status(440).json({ Error: "Session Expired!!" });
}

//-------------resetPassword--------------

const resetPassword = async (req, res) => {
    const { email, password: newPassword } = req.body;

    if (!req.app.locals.resetSession) {
        return res.status(440).json({ Error: "Session Expired!!" });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );
        res.status(200).json({ message: "Password Reset Successfull" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

//------------getUser (After verify user by authMiddlewere)-------------------


const getUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//-----------------------------Update User-----------------------------


const updateProfile = async (req, res) => {

    const id = req.user.userId;


    const {
        firstname,
        lastname,
        phone,
        email,
        address,
        pin,
    } = req.body;

    try {
        await User.findOneAndUpdate({ _id: id }, {
            firstname,
            lastname,
            phone,
            email,
            address,
            pin,
        }, { new: true });

        res.status(201).json("Profile Updated");

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { verifyUser, signup, signin, generateOTP, resetPassword, verifyOTP, createResetSession, getUser, updateProfile, };