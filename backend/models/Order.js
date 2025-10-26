import mongoose from "mongoose";

const orderItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    size:{type:String},
    color:{type:String},
    quantity:{type:Number,required:true}
},{id:false})


const OrderSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    orderItem:[orderItemSchema],
    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true}
    },
    paymentMethod:{type:String,required:true},
    totalPrice:{type:Number,required:true},
    isPaid:{type:Boolean,default:false},
    paidAt:{type:Date},
    paymentStatus:{type:String,default:"pending"},
    status:{type:String,default:"Processing",enum:["Processing","Shipped","Delivered","Cancelled"]},
},{timestamps:true})

const ordermodel=mongoose.model("order",OrderSchema);
export default ordermodel;