import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      // Defensive destructuring
      const {
        checkoutItem = [],
        shippingAddress = {},
        paymentMethod = "cod",
        totalPrice = 0,
      } = checkoutData;

      if (!checkoutItem.length) {
        throw new Error("No items in checkout");
      }

      const token = localStorage.getItem("userToken");

      const response = await axios.post(
        "http://localhost:3000/api/checkout",
        {
          checkoutItem,
          shippingAddress,
          paymentMethod,
          totalPrice,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      console.log("✅ Checkout created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Checkout creation failed:", error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
        state.error = null;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create checkout";
      });
  },
});

export default checkoutSlice.reducer;
