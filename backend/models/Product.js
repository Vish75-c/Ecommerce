
import mongoose  from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String,trim:true,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    discountPrice:{type:Number},
    countInStock:{type:Number,required:true,default:0},
    sku:{type:String,required:true},
    category:{type:String},
    brand:{type:String},
    sizes:{type:[String],required:true},
    colors:{type:[String],required:true},
    collections:{type:String,required:true},
    material:{type:String},
    gender:{type:String,enum:["Men","Women","Unisex"]},
    images:[{
        url:{type:String,required:true},
        altText:{type:String}
    }],
    isFeatured:{type:Boolean,default:false},
    isPublished:{type:Boolean,default:false},
    rating:{type:Number,default:0},
    numReviews:{type:Number,default:0},
    tags:[String],
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    metaTitle:{type:String},
    metaDescription:{type:String},
    metaKeywords:{type:String},
    dimensions:{
        length:Number,
        width:Number,
        height:Number,
    },
    weight:{type:Number}

},{timestamps:true})
const productmodel=mongoose.model('Product',productSchema);
export default productmodel