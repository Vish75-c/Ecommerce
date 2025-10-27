import express from "express";
import protect from "../middleware/authmiddleware.js";
import { checkadmin } from "../middleware/authmiddleware.js";
import productmodel from '../models/Product.js';
import { Router } from "express";
// access private/admin get method to fetch the details of the user 
// /api/admin/products

const router=Router();

router.get('/',protect,checkadmin,async (req,res)=>{
    try {
        const products=await productmodel.find({});
        if(!products)return res.status(400).json({message:"No product found"})
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})

export default router;