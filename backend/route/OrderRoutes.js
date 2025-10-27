import mongoose from "mongoose";
import protect from "../middleware/authmiddleware.js";
import checkoutmodel from "../models/Checkout.js";
import usermodel from "../models/user.js";
import { Router } from "express";
import ordermodel from "../models/Order.js";

const router=Router();
// /api/orders/my-orders to get the orders present in the database
// access private
router.get('/my-orders',protect,async (req,res)=>{
    try {
        const orders=await ordermodel.find({userId:req.user._id}).sort({createdAt:-1});
        if(!orders)res.status(404).json({message:"No orders found"});
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
})

// /api/orders/:id to fetch the detail of the single user using id
// get request
// access private

router.get("/:id",async (req,res)=>{
    try {
        const order=await ordermodel.findById(req.params.id)
        if(!order)res.status(404).json({message:"Order is not present with the id no"})
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
})
export default router;