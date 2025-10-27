import mongoose from "mongoose";

const subscribeSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    subscibedAt:{
        type:Date,
        default:Date.now,
    }
})

const subscribemodel=new mongoose.model('subscribe',subscribeSchema);
export default subscribemodel;