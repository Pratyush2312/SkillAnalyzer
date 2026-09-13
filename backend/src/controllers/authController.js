import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Incomplete Credentials"
            })
        }
        let hashPassword = await bcrypt.hash(password, 10);
        let user=await User.create({
            name,
            email,
            password: hashPassword
        })
        let token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(201).json({
            message: "User Logged In",
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Incomplete Credentials"
            })
        }
        let user = await User.findOne({ email: email });
        if (!user) { 
            return res.status(401).json({
                message:"Register First"
            })
        };
        let isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        let token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(201).json({
            message: "User Logged In",
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}


export const getMe = async (req, res) => {
    try {
        return res.status(200).json({
            user: req.user
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const logout = async (req, res) => { 
    try {
        res.clearCookie('token');
        return res.status(200).json({
            message:"User Logged out"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}