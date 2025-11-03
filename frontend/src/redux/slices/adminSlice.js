import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { act } from "react";

// fetch all the users (admin only)

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:3000/api/admin/users', { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// ADd the create user Section

export const addUser = createAsyncThunk('admin/addUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:3000/api/admin/users', userData, { header: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Update the user Info

export const updateUser=createAsyncThunk('admin/updateUser',async ({id,name,email,role},{rejectWithValue})=>{
    try {
        const response=await axios.put(`http://localhost:3000/api/admin/${id}`,{name,email,role},{headers:{Authorization:`Bearer ${localStorage.getItem('userToken')}`}})
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


// Delete a User
export const deleteUser=createAsyncThunk('admin/deleteUser',async({id},{rejectWithValue})=>{
    try {
        const response=await axios.delete(`http://localhost:3000/api/admin/users/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem('userToken')}`}})
        return id;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
})

const adminSlice=createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.users=action.payload
        }).addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=true;
            state.error=action.error
        }).addCase(updateUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(updateUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            const updatedUser=action.payload;
            const findIndex=state.users.findIndex((user)=>user._id===updatedUser._id);
            if(findIndex!==-1){
                state.users[findIndex]=updatedUser
            }
        }).addCase(updateUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }).addCase(deleteUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.users=state.users.filter((p)=>p._id!==action.payload)
        }).addCase(deleteUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }).addCase(addUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(addUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.users.push(action.payload.users);
            state.users=action.payload
        }).addCase(addUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default adminSlice.reducer;