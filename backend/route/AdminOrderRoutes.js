import express from "express";
import protect from "../middleware/authmiddleware.js";
import { checkadmin } from "../middleware/authmiddleware.js";
import ordermodel from "../models/Order.js";
import { Router } from "express";
// get request to info of all the products
// access private/admin /api/admin/orders

const router=Router();

router.get('/',protect,checkadmin,async (req,res)=>{
    try {
        const orders=await ordermodel.find({});
        if(!orders)return res.status(400).json({message:"No order found"});
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
})

// to update the status of any order
// put request /api/admin/orders/:id 
// access private/admin

router.put('/:id',protect,checkadmin,async (req,res)=>{
    try {
        const order=await ordermodel.findById(req.params.id)
        if(!order)return res.status(400).json({message:"No order found"});
        
            order.status=req.body.status;
            await order.save();
            res.status(200).json(order);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
})

// to delete any order
// delete reuest /api/admin/orders/:id
// access private/admin

router.delete('/:id',protect,checkadmin,async (req,res)=>{
    try {
        const order=await ordermodel.findById(req.params.id)
        if(!order)res.status(400).json({message:"No order found"});
        
            const response= await ordermodel.findByIdAndUpdate(req.params.id);
            
            res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
})

export default router;