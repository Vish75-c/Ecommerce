import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// helper function to load cart from localstorage
const loadCartFromStorage=()=>{
    const storedCart=localStorage.getItem("cart");
    return storedCart?JSON.parse(storedCart):{products:[]};
}
// helper function t save cart to localstorage

const saveCartToStorage=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart));
}

// fetch cart from a user or guest

export const fetchCart=createAsyncThunk("cart/fetchCart",async ({userId,guestId},{rejectWithValue})=>{
    try {
        const response=await axios.get(`http://localhost:3000/api/cart`,{params:{userId,guestId}})
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

// Addd an item to the cart foor a user or guest

export const addToCart=createAsyncThunk('cart/addToCart',async({productId,quantity,size,color,guestId,userId},{rejectWithValue})=>{
    try {
        const response=await axios.pos('http://localhost:3000/api/cart',{
            productId,
            quantity,
            size,
            color,
            guestId,
            userId
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// update the quantity of an item in the cart

export const updateCartItemQuantity=createAsyncThunk('cart/updateCartItemQuantity',async ({productId,guestId,quantity,userId,size,color},{rejectWithValue})=>{
    try {
        const response=await axios.put('http://localhost:3000/api/cart',{
            productId,
            userId,
            quantity,
            size,
            color,

        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Remove an item from the cart

export const removeFromCart=createAsyncThunk("cart/removeFromCart",async ({productId,guestId,userId,size,color},{rejectWithValue})=>{
    try {
        const response=await axios({
            method:"DELETE",
            url:'http://localhost:3000/api/cart',
            data:{productId,guestId,userId,size,color}
        })
        return response.data;
    } catch (error) {
        
        return rejectWithValue(error.response.data);
    }
})

// Merge guest cart into user cart

export const mergeCart=createAsyncThunk("cart/mergeCart",async({guestId,userId},{rejectWithValue})=>{
    try {
        const response=await axios.post('http://localhost:3000/api/cart/merge',{guestId,userId},{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`
    }})
    return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Creating Slices

const cartSlice=createSlice({
    name:"Cart",
    initialState:{
        cart:loadCartFromStorage(),
        loading:false,
        error:null,
    },
    reducers:{
        clearCart:(state)=>{
            state.cart={products:[]}
            localStorage.removeItem("cart")
        },
        extraReducers:(builder)=>{
            builder.addCase(fetchCart.pending,(state)=>{
                state.loading=true
                state.error=null
            }).addCase(fetchCart.fulfilled,(state,action)=>{
                state.loading=false;
                state.cart=action.payload;
                saveCartToStorage(action.payload)
            }).addCase(fetchCart.pending,(state)=>{
                state.loading=false
                state.error=action.error.message||"Failed to fetch Cart";
            }).addCase(addToCart.pending,(state)=>{
                state.loading=true
                state.error=null
            }).addCase(addToCart.fulfilled,(state,action)=>{
                state.loading=false;
                state.cart=action.payload;
                saveCartToStorage(action.payload)
            }).addCase(addToCart.pending,(state)=>{
                state.loading=false
                state.error=action.payload?.message||"Failed to add To Cart";
            }).addCase(updateCartItemQuantity.pending,(state)=>{
                state.loading=true
                state.error=null
            }).addCase(updateCartItemQuantity.fulfilled,(state,action)=>{
                state.loading=false;
                state.cart=action.payload;
                saveCartToStorage(action.payload)
            }).addCase(updateCartItemQuantity.pending,(state)=>{
                state.loading=false
                state.error=action.payload?.message||"Failed to update item quantity Cart";
            }).addCase(removeFromCart.pending,(state)=>{
                state.loading=true
                state.error=null
            }).addCase(removeFromCart.fulfilled,(state,action)=>{
                state.loading=false;
                state.cart=action.payload;
                saveCartToStorage(action.payload)
            }).addCase(removeFromCart.pending,(state)=>{
                state.loading=false
                state.error=action.payload?.message||"Failed to remove item";
            }).addCase(mergeCart.pending,(state)=>{
                state.loading=true
                state.error=null
            }).addCase(mergeCart.fulfilled,(state,action)=>{
                state.loading=false;
                state.cart=action.payload;
                saveCartToStorage(action.payload)
            }).addCase(mergeCart.pending,(state)=>{
                state.loading=false
                state.error=action.payload?.message||"Failed to fetch Cart";
            })
        }
    }
})

export const {clearCart}=cartSlice.actions;
export default cartSlice.reducer