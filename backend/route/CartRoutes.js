import cartModel from "../models/Cart.js";
import express from "express";
import { Router } from "express";
import productmodel from "../models/Product.js";
import protect from '../middleware/authmiddleware.js'

const router=Router();


// helper function to get cart
const findcart=async (userId,guestId)=>{
    if(userId){
        return await cartModel.findOne({userId:userId});
    }
    else if(guestId){
        return await cartModel.findOne({guestId:guestId})
    }
    return null;
}
// post /api/cart to add item in the cart 
// access public 
router.post('/',async (req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body;
    try {
        const product=await productmodel.findById(productId);
        if(!product)return res.status(403).json({message:"Product Do not exists"})
        const cart=await findcart(userId,guestId);
       
        if(cart){
            const productindex=cart.products.findIndex((p)=>p.productId.toString()==product._id&&p.size===size&&p.color===color)
            if(productindex>-1){
                cart.products[productindex].quantity+=quantity;
            }else{
                cart.products.push({
                    productId,
                    name:product.name,
                    image:product.images[0].url,
                    price:product.price,
                    size,
                    color,
                    quantity
                })
            }
            // recalculate the total price 
            cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0); 
            await cart.save();
            res.status(200).json(cart);
        }else{
            // creating new cart
           
            const newCart=await cartModel.create({
                userId:userId?userId:undefined,
                guestId:guestId?guestId:"guest_"+new Date().getTime(),
                products:[{
                    productId,
                    name:product.name,
                    image:product.images[0].url,
                    price:product.price,
                    size,
                    quantity,
                    color,
                }],

                totalPrice:product.price*quantity
            }) 
            console.log(newCart);
            return res.status(201).json(newCart)
        }
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

// put request to update the quantity of any item in the cart /api/cart
// access public 

router.put('/',async (req,res)=>{
    try {
        const {userId,guestId,productId,size,color,quantity}=req.body
        const cart=await findcart(userId,guestId);
        if(!cart)res.status(404).json({message:"cart Not Found"})
            console.log(cart);
        const findIndex=cart.products.findIndex((p)=>p.productId.toString()===productId&&p.size===size&&p.color===color);
        console.log(findIndex)
       if(findIndex>-1){
        if(quantity>0){
            cart.products[findIndex].quantity=quantity;
        }else{
            cart.products.splice(findIndex,1);
        }
        cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
        await cart.save();
        res.status(200).json(cart);
       }else{
        res.status(404).json({message:"Item not found in cart"});
       }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})

// delete /api/cart to delete any item present in the cart
// access public 

router.delete('/',async (req,res)=>{
    try {
        const {userId,productId,guestId,color,size}=req.body;
        const cart=await findcart(userId,guestId);
        if(!cart)res.status(404).json({message:"Cart Not Found"}) 
        console.log(cart);
        const findIndex=cart.products.findIndex((p)=>p.productId.toString()===productId&&p.color===color&&p.size===size);
        console.log(findIndex)
        if(findIndex>-1){
            cart.products.splice(findIndex,1);
            cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);

            await cart.save();
            res.status(200).json(cart);
        }else{
            res.status(404).json({message:"Product not found in the cart"});
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

// get to fetch the detail of the cart /api/cart
// access public 

router.get("/",async (req,res)=>{
    try {
        const {userId,guestId}=req.query;
        const cart=await findcart(userId,guestId);
        if(!cart)res.status(403).json({message:"Cart Not Found"});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

// post /api/cart/merge to merge the guestcart and the usercart if exist upon register or login
// access private

router.post("/merge",protect,async (req,res)=>{
    try {
        console.log("visited");
        const {guestId}=req.body;
        const userId=req.user._id;
        const guestCart=await cartModel.findOne({guestId:guestId});
        const userCart=await cartModel.findOne({userId:userId});
        console.log(guestCart);
        console.log(userCart);
        if(guestCart){
            if(userCart){
                guestCart.products.forEach((item)=>{
                    const findIndex=userCart.products.findIndex((p)=>p.productId.toString()===item.productId&&p.size===item.size&&item.color===item.color)
                    if(findIndex>-1){
                        userCart.products[findIndex].quantity+=guestCart.products[findIndex].quantity
                    }else{
                        userCart.products.push(item);
                    }
                })
                await userCart.save();
                await cartModel.findOneAndDelete({guestId:guestId});
                return res.status(200).json(userCart);
            }else{
                guestCart.userId=userId;
                guestCart.guestId=undefined;
                await guestCart.save();
                return res.status(200).json(guestCart);
            }
        }else{
            if(userCart){
                return res.status(200).json(userCart)
            }
            return res.status(404).json({message:"guest cart do not exists"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})
export default router
