import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/admin/products";

// Fetch all products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch");
    }
  }
);

// Create product
export const createProducts = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData) => {
    const response = await axios.post(API_URL, productData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    return response.data;
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    return response.data;
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    return id;
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    error: null,
    loading: false,
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...action.payload];
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.products.findIndex((p) => p._id === updated._id);
        if (index !== -1) state.products[index] = updated;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export default adminProductSlice.reducer;
