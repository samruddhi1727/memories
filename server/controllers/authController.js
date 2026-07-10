import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }
    try {
        const user = await userModel.findOne({ email });

        if (!user) return res.status(404).json({ success: false, message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const token = jwt.sign({ email: user.email, id: user._id },  process.env.JWT_SECRET, { expiresIn: "5d" });
        res.cookie('jwttoken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password ) {
        return res.status(400).json({
            success: false,
            message: "Missing required Details"
        });
    }
    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) return res.status(400).json({ success: false, message: "User Already Exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await userModel.create({  name: name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "5d" });
        res.cookie('jwttoken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
};