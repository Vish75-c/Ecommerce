import express, { Router } from "express";
import protect from "../middleware/authmiddleware.js";
import checkoutModel from "../models/Checkout.js";
import orderModel from "../models/Order.js";
import cartModel from "../models/Cart.js";

const router = Router();

// @route   POST /api/checkout
// @desc    Create a new checkout session
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
      return res.status(400).json({ message: "No items in checkout." });
    }

    const checkout = await checkoutModel.create({
      userId: req.user._id,
      checkoutItem: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
      isFinalised: false,
    });

    console.log("✅ Checkout created for user:", req.user._id);
    res.status(200).json(checkout);
  } catch (error) {
    console.error("❌ Checkout creation failed:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   PUT /api/checkout/:id/pay
// @desc    Update payment status of a checkout
// @access  Private
router.put("/:id/pay", protect, async (req, res) => {
  try {
    const { paymentStatus, paymentDetails } = req.body;
    const checkout = await checkoutModel.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentDetails = paymentDetails;
      checkout.paymentStatus = paymentStatus;
      checkout.paidAt = Date.now();

      await checkout.save();
      return res.status(200).json(checkout);
    } else {
      return res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (error) {
    console.error("❌ Payment update failed:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   POST /api/checkout/:id/finalize
// @desc    Finalize checkout into a confirmed order
// @access  Private
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await checkoutModel.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalised) {
      const finalOrder = await orderModel.create({
        userId: req.user._id,
        orderItem: checkout.checkoutItem,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      checkout.isFinalised = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // Empty the user's cart after successful order
      await cartModel.findOneAndDelete({ userId: req.user._id });

      return res.status(200).json(finalOrder);
    } else if (checkout.isPaid && checkout.isFinalised) {
      return res.status(200).json({ message: "Order already finalized" });
    } else {
      return res.status(400).json({ message: "Payment not completed yet" });
    }
  } catch (error) {
    console.error("❌ Finalize failed:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
