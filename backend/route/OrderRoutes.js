import mongoose from "mongoose";
import protect from "../middleware/authmiddleware.js";
import checkoutmodel from "../models/Checkout.js";
import usermodel from "../models/user.js";
import { Router } from "express";

const router=Router();

export default router;