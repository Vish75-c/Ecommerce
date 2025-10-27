import express from "express";
import { Router } from "express";
import subscribemodel from "../models/Subscribe.js";
import protect from "../middleware/authmiddleware.js";

const router=Router();
// handle newsletter subscription
// access public post /api/subscriber

router.post('/',async (req,res)=>{
    try {
        const {email}=req.body;
       
        if(!email)res.status(400).json({message:"Email Not Entered"});
         
        const subscribe=await subscribemodel.findOne({email:email});
        console.log(subscribe);
        if(subscribe)return res.status(400).json({message:"Already subscribed with the email"});

        const data=await subscribemodel({email:email});
        
        const response=await data.save();
       
         res.status(200).json({message:"Email Subscriber to the newsletter"});
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
})
export default router;