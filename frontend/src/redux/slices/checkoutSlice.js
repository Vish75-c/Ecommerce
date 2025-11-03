import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a checkout section

export const createCheckout=createAsyncThunk('checkout/createCheckou',async(checkoutdata,{rejectWithValue})=>{
    try {
        const response=await axios.post('http://localhost:3000/api/checkout',checkoutdata,{headers:{Authorization:`Bearer ${localStorage.getItem(userToken)}`}})
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
} )

const checkoutSlice=createSlice({
    name:"Checkout",
    initialState:{
        checkout:null,
        loading:false,
        error:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(createCheckout.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(createCheckout.fulfilled,(state,action)=>{
            state.loading=false
            state.error=action.payload
        }).addCase(createCheckout.rejected,(state,action)=>{
            state.loading=true
            state.error=action.payload.message
        })
    }
})
export default checkoutSlice.reducer