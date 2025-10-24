import express from "express";
import jwt from "jsonwebtoken"
import usermodel from "../models/user.js";
import { configDotenv } from "dotenv";
configDotenv();
const protect = async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = await jwt.verify(token, process.env.jwt_secretkey);
            // console.log(decoded);
            const user = await usermodel.findById(decoded.user.id).select('-password');
            req.user = user;
            // console.log(user);
            next();
        } catch (err) {
            console.log("Token Validation Failed", err);
            res.status(401).send("Token Verification failed");
        }
    } else {
        console.log("Token Validation Failed", err);
        res.status(401).send("Token Verification failed");
    }
}
export const checkadmin = (req, res, next) => {
    try {
      
        if (req.user.role === 'admin') {
            next();
        }else{
         res.status(403).json({ success: false, message: "Not Autorised as admin" })
        }
    } catch (err) {
       res.status(403).json({ success: false, message: "Not Autorised as admin" })
    }
}
export default protect