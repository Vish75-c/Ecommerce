import mongoose from "mongoose";

const cartItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    },
    name:{type:String},
    image:{type:String},
    price:{type:String},
    size:{type:String},
    color:{type:String},
    quantity:{type:Number,default:1},

},{_id:false});

const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:false
    },
    guestId:{type:String},
    products:[cartItemSchema],
    totalPrice:{
        type:Number,
        required:true,
        default:0
    }


},{timestamps:true})

const cartModel=mongoose.model('Cart',cartSchema)
export default cartModel