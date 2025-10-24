import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    name:{type:String,trim:true,required:true},
    email:{type:String,trim:true,required:true,unique:true,match:[/.+\@.+\..+/,"Enter A valid email"]},
    password:{type:String,trim:true,required:true},
    role:{type:String,enum:["customer","admin"],default:"customer"}
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(this.password,salt);
        this.password=hash;
        return next();
    }catch(err){
        return next(err);
    }
})
userSchema.methods.matchPassword=async function(enteredpassword){
    return bcrypt.compare(enteredpassword,this.password);
}
const usermodel=mongoose.model('users',userSchema);
export default usermodel;
