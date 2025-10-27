import express from "express";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import { configDotenv } from "dotenv";
import { Router } from "express";
const router=Router();

configDotenv();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
// multer setup using memomy storage

const storage=multer.memoryStorage();
const upload=multer({storage});

router.post('/',upload.single("image"),async (req,res)=>{
    try {
        if(!req.file)return res.status(400).json({message:"NO files Uploaded"});
        // function to handle the stream upload to cloudinary

        const streamUpload=(fileBuffer)=>{
            return new Promise((resolve,reject)=>{
                const stream=cloudinary.uploader.upload_stream((error,result)=>{
                    if(result){
                        resolve(result)
                    }else{
                        reject(error);
                    }
                })
                // use streamifier to convert file buffer to a stream 
                streamifier.createReadStream(fileBuffer).pipe(stream);
            })
        }
        // call the streamUpload function
        const result=await streamUpload(req.file.buffer);
        // respond with the uploaded image url
        res.json({imageUrl:result.secure_url});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
})

export default router