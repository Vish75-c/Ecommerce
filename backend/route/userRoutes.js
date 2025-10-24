import express from "express";
import  jwt  from "jsonwebtoken";
import usermodel from "../models/user.js";
import { Router } from "express";
import { configDotenv } from "dotenv";
import protect from "../middleware/authmiddleware.js";
configDotenv();
const router=Router();
// Registering user api
router.post('/register',async (req,res)=>{
    try{
        const body=req.body;
        console.log(body);
        const userexist=await usermodel.findOne({email:body.email});
        if(userexist)return res.status(401).json({message:"User exists"})
          
        const user=new usermodel(body);
      
        const response=await user.save();
        
        const payload={user:{id:response._id,role:response.role}};
        jwt.sign(payload,process.env.jwt_secretkey,{expiresIn:"133h"},(err,token)=>{
            if(err)throw err;
            res.status(201).json({success:true,token,user:response});
        })
    }catch(err){
        res.status(500).json({success:false,message:"server error"});
    }
})

// user login api public access /api/users/login

router.post('/login',async (req,res)=>{
    try{
        const body=req.body;
        const existuser=await usermodel.findOne({email:body.email});
        if(!existuser)return res.status(401).json({success:false,message:"user do not exists"});
        const match=await existuser.matchPassword(body.password);
        if(!match)return res.status(401).json({success:false,message:"user do not exists"});

        const payload={user:{id:existuser._id,role:existuser.role}};
        jwt.sign(payload,process.env.jwt_secretkey,{expiresIn:"133h"},(err,token)=>{
            if(err)throw err;
            res.status(201).json({success:true,token,user:existuser});
        })
    }catch(err){
        res.status(500).json({success:false,message:"server error"});
    }
})

// Profile route protect private access api/users/profile 

router.get('/profile',protect,async (req,res)=>{
    
    res.status(200).json(req.user);
})
export default router