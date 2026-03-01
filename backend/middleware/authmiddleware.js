import express from "express";
import jwt from "jsonwebtoken"
import usermodel from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
const protect = async (req, res, next) => {

    let token=res.cookies.jwt;
    if(!token)return res.status(401).sen("You are not authenticated");
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) {
            return res.status(401).send("Token is not valid")
        } else {
            req.userId = payload.userId;
            // console.log(req.user);
            next()
        }
    })
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