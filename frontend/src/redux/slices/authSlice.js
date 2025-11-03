import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
// retrive user information from local storage

const userFromStorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null;

// check for an existing guest id in the local storage or genenrate a new one

const initialGuestId=localStorage.getItem("guestId")|| `guest_${new Date().getTime()}`
localStorage.setItem("guestId",initialGuestId);

// Initial State

const initialState={
    user:userFromStorage,
    guestId:initialGuestId,
    loading:false,
    error:null,
}

// async thunk for user login
export const loginUser=createAsyncThunk('auth/loginUser',async (userData,{rejectWithValue})=>{
    try {
        console.log("visited");
        console.log(import.meta.env.BACKEND_URL);
        const response=await axios.post(`http://localhost:3000/api/users/login`,userData)
        localStorage.setItem('userInfo',JSON.stringify(response.data.value));
        localStorage.setItem("userToken",response.data.token);
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// async thunk for user registration
export const registerUser=createAsyncThunk('auth/registerUser',async (userData,{rejectWithValue})=>{
    try {
        
        const response=await axios.post(`http://localhost:3000/api/users/register`,userData)
        localStorage.setItem('userInfo',JSON.stringify(response.data.value));
        localStorage.setItem("userToken",response.data.token);
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// slice
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null;
            state.guestId=`guest_${new Date().getTime()}`
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem('guestId',state.guestId);
        },
        generateNewGuestId:(state)=>{
            state.guestId=`guest_${new Date().getTime()}`;
            localStorage.setItem('guestId',state.guestId);
        },
        extraReducers:(builder)=>{
            builder.addCase(loginUser.pending,(state)=>{
                state.loading=true;
                state.error=null
            }).addCase(loginUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            }).addCase(loginUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message
            }).addCase(registerUser.pending,(state)=>{
                state.loading=true;
                state.error=null
            }).addCase(registerUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            }).addCase(registerUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message
            })
        }
    }
})

export const {logout,generateNewGuestId}=authSlice.actions;
export default authSlice.reducer;