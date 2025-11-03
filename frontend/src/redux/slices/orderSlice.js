import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch user orders

export const fetchUserOrders=createAsyncThunk('orders/fetchUserOrders',async (_,{rejectWithValue})=>{
    try {
        const response=await axios.get('http://localhost:3000/api/orders/my-orders',{headers:{Authorization:`Bearer ${localStorage.getItem('userToken')}`}})
        return response.data;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
})

// Aync thunk to fetch orders detail by id;
export const fetchUserDetails=createAsyncThunk('orders/fetchOrdersDetails',async(fetchUserDetails,{rejectWithValue})=>{
    try {
        const response=await axios.get(`http://localhost:3000/api/orders/${orderId}`,{headers:{Authorization:`Bearer ${localStorage.getItem('userToken')}`}})
        return response.data;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
})

const orderSlice=createSlice({
    name:"orders",
    initialState:{
        orders:[],
        totalOrder:0,
        orderDetails:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUserOrders.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.loading=false
            state.orders=action.payload
            state.error=null
        }).addCase(fetchUserOrders.rejected,(state,action)=>{
            state.loading=true
            state.error=action.payload
        }).addCase(fetchUserDetails.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(fetchUserDetails.fulfilled,(state,action)=>{
            state.loading=false
            state.orders=action.payload
            state.error=null
        }).addCase(fetchUserDetails.rejected,(state,action)=>{
            state.loading=true
            state.error=action.payload
        })
    }
    
})

export default orderSlice.reducer