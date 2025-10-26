import express from "express";
import cors from "cors"
import { configDotenv } from "dotenv";
import db from "./config/db.js";
import productRoutes from './route/ProductRoutes.js'
import checkoutRoutes from './route/CheckoutRoutes.js'
import userRoutes from "./route/userRoutes.js";
import cartRoutes from "./route/CartRoutes.js"
import orderRoutes from "./route/OrderRoutes.js"
configDotenv()

const app=express();
const port=process.env.PORT||3000
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("Start");
})
app.use('/api/users',userRoutes);
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/checkout',checkoutRoutes);
app.use('/api/orders',orderRoutes);
app.listen(port,()=>{
    console.log(`Server is Running on ${port}`);
})