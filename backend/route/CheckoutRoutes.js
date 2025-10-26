import protect from "../middleware/authmiddleware.js";
import checkoutmodel from "../models/Checkout.js";
import ordermodel from "../models/Order.js";
import cartModel from "../models/Cart.js";
import productmodel from "../models/Product.js";
import express from "express";
import { Router } from "express";

const router=Router();
// post /api/checkout to create checkout session
// access private 

router.post('/',protect,async (req,res)=>{
    try {
        const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body;
        const checkout=await checkoutmodel.create({
            userId:req.user._id,
            checkoutItem:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"pending",
            isPaid:false
        })
        console.log("Checkout created for user");
        res.status(200).json(checkout);
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

// /api/checkout/:id/pay to update the payment
// access private

router.put("/:id/pay",protect,async (req,res)=>{
    try {
        const {paymentStatus,paymentDetails}=req.body;
        const checkout=await checkoutmodel.findById(req.params.id);
        if(!checkout)res.status(404).json({message:"checkout not found"});

        if(paymentStatus==='paid'){
            checkout.isPaid=true;
        checkout.paymentDetails=paymentDetails
        checkout.paymentStatus=paymentStatus
        checkout.paidAt=Date.now();
        await checkout.save();
        res.status(200).json(checkout);
        }else{
            res.status(400).json({message:"Invalid payment status"});
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
})

// /api/checkout/:id/finalize 
// access private

router.post("/:id/finalize",protect,async (req,res)=>{
    try {
        const checkout=await checkoutmodel.findById(req.params.id);
        if(!checkout)res.status(400).json({message:"Checkout not Found"})
        if(checkout.isPaid&&!checkout.isFinalised){
            const finalOrder=await ordermodel.create({
                userId:req.user._id,
                orderItem:checkout.checkoutItem,
                shippingAddress:checkout.shippingAddress,
                paymentMethod:checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid:true,
                paidAt:checkout.paidAt,
                isDelivered:false,
                paymentStatus:"paid",
                paymentDetails:checkout.paymentDetails
            })
            checkout.isFinalised=true;
            checkout.finalizedAt=Date.now();
            await checkout.save();
            await cartModel.findOneAndDelete({userId:req.user._id})
            res.status(200).json(finalOrder);
        }else if(checkout.isPaid&&checkout.isFinalised){
            res.status(200).json(p)
        }else{
            res.status(404).json({message:"Payment status is false"})
        }
    } catch (error) {

        console.log(error);
        res.status(500).send("Server Error");
    }
})

export default router;