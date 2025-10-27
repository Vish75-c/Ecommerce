import protect from "../middleware/authmiddleware.js";
import { checkadmin } from "../middleware/authmiddleware.js";
import usermodel from "../models/user.js";
import express from "express";
import { Router } from "express";

const router=Router();

// get request to get all the user present in the database
// access private/admin

router.get('/',protect,checkadmin,async (req,res)=>{
    try {
        const users=await usermodel.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
})

// post request to add the user into the database
// access private/admin

router.post('/',protect,checkadmin,async (req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        const user=await usermodel.create({
            name,
            email,
            password,
            role
        })
        if(!user)res.status(400).json({message:"User Not created"})
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
})
// put request /api/admin/users/:id
// to update the customer name email password role
// private/admin 

router.put('/:id',protect,checkadmin,async (req,res)=>{
    try {
        console.log("SERVER");
        const user=await usermodel.findById(req.params.id);
        if(!user)res.status(400).json({message:"User not found"});
        user.name=req.body.name||user.name
        user.email=req.body.email||user.email
        user.password=req.body.password||user.password
        user.role=req.body.role||user.role
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

// delete /api/admin/users/:id to delete user by their id 
// admin/private access delete 

router.delete('/:id',protect,checkadmin,async (req,res)=>{
    try {
       
        const user=await usermodel.findById(req.params.id);
        console.log(user);
        if(!user)return res.status(400).json({message:"user not found"});
        const response=await usermodel.findByIdAndDelete(user._id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
})
export default router;