import mongoose from "mongoose";
import productmodel from "./models/Product.js";
import usermodel from './models/user.js'
import { configDotenv } from "dotenv";
import products from './data/products.js'
configDotenv();

const seedData=async ()=>{
    try{
        await mongoose.connect(process.env.atlas_mongo_url)
        console.log("Mongo Connected");
        await usermodel.deleteMany();
        await productmodel.deleteMany();
        const createduser=await usermodel.create({
            name:"AdminUser",
            email:"Admin@gmail.com",
            role:"admin",
            password:"123456"
        })
        const userid=createduser._id;
        const updatedproduct=products.map((item)=>{return {...item,user:userid}})
        await productmodel.insertMany(updatedproduct)
        console.log("Product Inserted")
        mongoose.connection.close();
        process.exit(0);

    }catch(err){
        process.exit(1);
    }
}
seedData();