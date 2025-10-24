import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const url=process.env.atlas_mongo_url
console.log(url)
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('connected',()=>{
    console.log("Connected to MongoDb server")
})
db.on('disconnected',()=>{
    console.log("disconnected from mongodb server")
})
db.on("error",()=>{
    console.log("Error While connected mongodb server")
})
export default db;