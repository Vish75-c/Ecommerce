import express from "express";
import jwt from "jsonwebtoken";
import usermodel from "../models/user.js";
import { Router } from "express";
import dotenv from "dotenv";
import protect from "../middleware/authmiddleware.js";

dotenv.config();
const router = Router();

const jwtMaxAge = 3 * 24 * 60 * 60
const cookieMaxAge = jwtMaxAge * 1000;
const generateToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.jwt_secretkey, { expiresIn: jwtMaxAge })
};
// Registering user api
router.post('/register', async (req, res) => {
    try {
        const userId = req.userId;
        console.log(userId);
        const user = await usermodel.findOneById(userId);
        if (user) return res.status(401).json({ message: "User exists" })
        const newUser = new usermodel(body);
        await newUser.save();
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("jwt", generateToken(newUser._id, newUser.role), {
            maxAge: cookieMaxAge,
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Lax"
        });
        res.status(200).json({ user: newUser });
    } catch (err) {
        res.status(500).send("Server error");
    }
})

// user login api public access /api/users/login

router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const existuser = await usermodel.findOne({ email: body.email });
        if (!existuser) return res.status(401).json({ success: false, message: "user do not exists" });
        const match = await existuser.matchPassword(body.password);
        if (!match) return res.status(401).json({ success: false, message: "user do not exists" });

        const payload = { user: { id: existuser._id, role: existuser.role } };
        jwt.sign(payload, process.env.jwt_secretkey, { expiresIn: "133h" }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ success: true, token, user: existuser });
        })
    } catch (err) {
        res.status(500).json({ success: false, message: "server error" });
    }
})

// Profile route protect private access api/users/profile 

router.get('/profile', protect, async (req, res) => {

    res.status(200).json(req.user);
})
export default router   