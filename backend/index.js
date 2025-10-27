import express from "express";
import cors from "cors"
import { configDotenv } from "dotenv";
import db from "./config/db.js";
import productRoutes from './route/ProductRoutes.js'
import checkoutRoutes from './route/CheckoutRoutes.js'
import userRoutes from "./route/userRoutes.js";
import cartRoutes from "./route/CartRoutes.js"
import orderRoutes from "./route/OrderRoutes.js"
import uploadRoutes from "./route/uploadRoutes.js"
import subscribeRoute from "./route/SubscribeRoutes.js"
import adminRoutes from "./route/AdminRoutes.js"
import productadminRoutes from "./route/ProductAdminRoutes.js"
import orderadminRoutes from "./route/AdminOrderRoutes.js"
configDotenv()

const app=express();
const port=process.env.PORT||3000
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("Start");
})

// user Routes
app.use('/api/users',userRoutes);
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/checkout',checkoutRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes)
app.use('/api/subscribe',subscribeRoute);

// Admin Routes
app.use('/api/admin/users',adminRoutes);
app.use('/api/admin/products',productadminRoutes)
app.use('/api/admin/orders',orderadminRoutes)
app.listen(port,()=>{
    console.log(`Server is Running on ${port}`);
})