import { UserValidation } from "../validators/validation.js";
import { AuthModel } from "../model/AuthModel.js";
import bcryptjs from "bcryptjs";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const UserCtrl = {};


UserCtrl.register = async (req, res) => {
    const body = req.body;
    console.log("New Registration Request:", JSON.stringify(body, null, 2));
    const { error, value } = UserValidation.validate(body, { abortEarly: false })
    if (error) {
        return res.status(400).json({ error: error.details.map(err => err.message) })
    }
    try {
        const UserPresentWithEmail = await AuthModel.findOne({ email: value.email });
        if (UserPresentWithEmail) {
            return res.status(400).json({ error: "email already present" })
        }
        
        if (value.phoneNumber) {
            const UserPresentWithPhone = await AuthModel.findOne({ phoneNumber: value.phoneNumber });
            if (UserPresentWithPhone) {
                return res.status(400).json({ error: "phone number already present" })
            }
        }

        const user = new AuthModel(value);
        const salt = await bcryptjs.genSalt();
        const hashpassword = await bcryptjs.hash(value.password, salt);
        user.password = hashpassword;
        await user.save()
        res.json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}



UserCtrl.generateOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await AuthModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;
        user.otpCreatedAt = new Date();
        await user.save();

        const emailUser = process.env.EMAIL_USER || "crushgokul1455@gmail.com";
        const emailPass = process.env.EMAIL_PASS || "emoweootsxwaviib";

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

        await transporter.sendMail({
            from: emailUser,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`
        });

        res.json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


UserCtrl.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await AuthModel.findOne({ email, otp });
        if (!user) {
            return res.status(400).json({ error: "invalid user credential" });
        }
        // Check for expiration
        const now = new Date();
        if (!user.otpCreatedAt) {
            return res.status(400).json({ error: "OTP not generated" });
        }
        const timeDiff = (now - user.otpCreatedAt) / 1000 / 60; // in minutes
        if (timeDiff > 10) {
            return res.status(400).json({ error: "OTP expired" });
        }

        user.otp = undefined;
        user.otpCreatedAt = undefined;
        await user.save();

        const jwtSecret = process.env.JWT_SECRET || "Gokul@2005";
        const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });
        res.json({ message: "you are loggedIn", token, user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

UserCtrl.googleLogin = async (req, res) => {
    const { credential } = req.body;
    const googleClientId = process.env.GOOGLE_CLIENT_ID || "747253058768-kpe5kbhsh58636ekqr0s8vgb2g8o277m.apps.googleusercontent.com";
    console.log("Backend GOOGLE_CLIENT_ID:", googleClientId);
    console.log("Request Body:", JSON.stringify(req.body, null, 2));

    try {
        const client = new OAuth2Client(googleClientId);
        // Decode without verification just to see what's inside if verification fails
        const decoded = jwt.decode(credential);
        console.log("Token Audience (aud):", decoded?.aud);

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: googleClientId
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        let user = await AuthModel.findOne({ email });
        if (!user) {
            user = new AuthModel({
                userName: name,
                email: email
            });
            await user.save();
        }

        const jwtSecret = process.env.JWT_SECRET || "Gokul@2005";
        const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });
        res.json({ message: "Login Successful", token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Google Login Failed" });
    }
};

UserCtrl.account = async (req, res) => {
    try {
        const user = await AuthModel.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default UserCtrl;