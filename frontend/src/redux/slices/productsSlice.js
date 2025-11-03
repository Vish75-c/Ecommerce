import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk to fetch products by collections and optional filters

export const fetchProductsByFilters=createAsyncThunk("products/fetchByFilters",
    async ({
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
    limit,})=>{
        const query=new URLSearchParams();
        if(collection)query.append("Collection",collection);
        if(size)query.append("size",size);
        if(color)query.append("color",color);
        if(gender)query.append("gender",gender);
        if(minPrice)query.append("minPrice",minPrice);
        if(maxPrice)query.append("maxPrice",maxPrice);
        if(sortBy)query.append("sortBy",sortBy);
        if(search)query.append("search",search);
        if(category)query.append("category",category);
        if(material)query.append("material",material);
        if(brand)query.append("brand",brand);
        if(limit)query.append("limit",limit);
        const response=await axios.get(`http://localhost:3000/api/product?${query.toString()}`)
        return response.data;
    }
)
// async thunk to fetch a product by id
export const fetchProductDetails=createAsyncThunk('products/fetchProductDetails',async (id)=>{
    const response=await axios.get(`http://localhost:3000/api/product/${id}`)
    return response.data;
})

// async thunk to fetch similar products

export const updateProduct=createAsyncThunk("products/updateProduct",async ({id,data})=>{
    const response=await axios.put(`http://localhost:3000/api/product/${id}`,data,{headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`,
        }})
        return response.data;
})

// Async thunk to fetch similar products
export const fetchSimilarProducts=createAsyncThunk("products/fetchSimilarProducts",async ({id})=>{
    const response=await axios.get(`http://localhost:3000/api/product/similar/${id}`)
    return response.data;
})

const productsSlice=createSlice({
    name:"products",
    initialState:{
        products:[],
        selectedProduct:null,
        similarProduct:false,
        loading:false,
        filters:{
            category:"",
            size:"",
            color:"",
            gender:"",
            brand:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            material:"",
            collection:""
        }
    },
    reducers:{
        setFilters:(state,action)=>{
            state.filters={...state.filters,...action.payload};
        },
            clearFilters:(state)=>{
                state.filters={
            category:"",
            size:"",
            color:"",
            gender:"",
            brand:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            material:"",
            collection:""
                }
            },
        extraReducers:(builder)=>{
            builder.addCase(fetchProductsByFilters.pending,(state)=>{
                state.loading=true,
                state.error=null
            })
            .addCase(fetchProductsByFilters.fulfilled,(state,action)=>{
                state.loading=false;
                state.products=Array.isArray(action.payload)?action.payload:[];
            }).addCase(fetchProductsByFilters.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.error.message;
            })
            // Handling product update
            .addCase(updateProduct.pending,(state)=>{
                state.loading=true,
                state.error=null
            })
            .addCase(updateProduct.fulfilled,(state,action)=>{
                state.loading=false;
                const updatedProduct=action.payload;
                const index=state.products.findIndex((product)=>product._id===updateProduct._id);
                if(index!==-1){
                    state.product[index]=updatedProduct;
                }
            }).addCase(updateProduct.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.error.message;
            })
            .addCase(similarProduct.pending,(state)=>{
                state.loading=true,
                state.error=null
            })
            .addCase(similarProduct.fulfilled,(state,action)=>{
                state.loading=false;
                state.products=action.payload
            }).addCase(similarProduct.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.error.message;
            })
        }

    }
})
export const {setFilters,clearFilters}=productsSlice.actions;
export default productsSlice.reducer;