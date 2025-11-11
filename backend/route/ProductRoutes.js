import protect from "../middleware/authmiddleware.js";
import productmodel from "../models/Product.js";
import express from "express";
import { Router } from "express";
import { checkadmin } from "../middleware/authmiddleware.js";
const router = Router();
// /api/products access private/admin create a new product

router.post('/', protect, checkadmin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku } = req.body;
        const product = new productmodel({
            name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku, user: req.user.id
        })
        const createdproduct = await product.save();
        res.status(200).json(createdproduct);
    } catch (err) {
        res.status(200).send("server error")
    }
})
router.put('/:id', protect, checkadmin, async (req, res) => {
    try {
        const id = req.params.id;
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } = req.body;

        const product = await productmodel.findById(id);

        if (product) {
            // ✅ Update only if value provided
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price ?? product.price;
            product.discountPrice = discountPrice ?? product.discountPrice;
            product.countInStock = countInStock ?? product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes?.length ? sizes : product.sizes;
            product.colors = colors?.length ? colors : product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images?.length ? images : product.images;
            product.isFeatured = isFeatured ?? product.isFeatured;
            product.isPublished = isPublished ?? product.isPublished;
            product.tags = tags?.length ? tags : product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight ?? product.weight;
            product.sku = sku || product.sku;

            const updatedProduct = await product.save();

            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                product: updatedProduct,
            });
        } else {
            res
                .status(404)
                .json({ success: false, message: "Product does not exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
// delete /api/product/:id delete 
// access private/admin

router.delete('/:id',protect,checkadmin,async (req,res)=>{
    try{
        const id=req.params.id;
        const product=await productmodel.findById(id);
        console.log(product);
        if(product){
            await product.deleteOne();
            res.status(200).json({success:true,product})
        }else{
            res.status(403).json({success:false,message:"Product not found"})
        }
    }catch(err){
        res.status(403).json({success:false,message:"Product not found"})
    }
})

// get /api/product to fetch items according to filter logic
// public access get request

router.get('/', async (req, res) => {
  try {
    console.log(req.query);

    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit
    } = req.query;

    const query = {};

    // Filter logic
    if (collection && collection.toLowerCase() !== 'all') {
      query.collections = collection;
    }
    if (category && category.toLowerCase() !== 'all') {
      query.category = category;
    }
    if (color) query.colors = { $in: color.split(',') };
    if (brand) query.brand = { $in: brand.split(',') };
    if (size) query.sizes = { $in: size.split(',') };
    if (material) query.material = { $in: material.split(',') };
    if (gender) query.gender = gender;
    if (maxPrice || minPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // ✅ FIXED search logic
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } }, 
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort logic
    const sort = {};
    if (sortBy) {
      switch (sortBy) {
        case 'priceAsc':
          sort.price = 1;
          break;
        case 'priceDesc':
          sort.price = -1;
          break;
        case 'popularity':
          sort.rating = -1;
          break;
      }
    }

    const products = await productmodel
      .find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// get /api/product/best-seller to find best seller
// public 

router.get('/best-seller',async (req,res)=>{
    try {
        const bestseller=await productmodel.findOne().sort({rating:-1});
        if(bestseller){
            res.status(200).json(bestseller);
        }else{
            res.status(404).send("product not found");
        }
    } catch (error) {
        res.status(500).send("Server Error");
    }
})
// get /api/product/new-arrival fetching 8 product according to recent createAt data
// access publuc 

router.get('/new-arrivals',async (req,res)=>{
    try {
        const product=await productmodel.find().sort({createdAt:-1}).limit(8);
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).send("No New Arrivals");
        }
    } catch (error) {
        res.status(500).send("Server Error");
    }
})
// get /api/product/:id to fetch product details
// access public
router.get('/:id', async (req, res) => {
  try { 
    const id = req.params.id; // ✅ correct
    const product = await productmodel.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product does not exist" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// get /api/product/similar/:id to fetch 4 similar product with same category and gender 
// access public 
router.get('/similar/:id',async (req,res)=>{
    try {
        
        const id=req.params.id;
        const product=await productmodel.findById(id);
        if(product){
            const similar=await productmodel.find({
                _id:{$ne:product._id},
                gender:product.gender,
                category:product.category
            }).limit(4)
            res.status(200).json(similar);
        }else{
            res.status(404).send("Not Found similar products");
        }
    } catch (error) {
        res.status(500).send("Server Error");
    }
})


export default router