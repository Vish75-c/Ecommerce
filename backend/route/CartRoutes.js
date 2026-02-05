// man problem is with my backend it is not creating cart with user id give the correct backend so that i cannot get 403 error only my code corrected version import cartModel from "../models/Cart.js";
// routes/cart.js
import express from "express";
import mongoose from "mongoose";
import productModel from "../models/Product.js";
import cartModel from "../models/Cart.js";
import protect from "../middleware/authmiddleware.js";

const router = express.Router();

/**
 * Helper: convert valid ObjectId strings to actual ObjectId.
 * If input is an object with _id, use that. If not valid, return the original value.
 */
const toObjectIdIfValid = (id) => {
  if (!id && id !== 0) return null;
  // handle case where frontend passed full user object
  if (typeof id === "object" && id._id) id = id._id;
  if (typeof id === "string" && mongoose.isValidObjectId(id)) {
    return new mongoose.Types.ObjectId(id);
  }
  return id;
};

// helper function to get cart (will handle userId being string/object)
const findcart = async (userId, guestId) => {
  const normalizedUserId = toObjectIdIfValid(userId);
  console.log(normalizedUserId);
  if (normalizedUserId) {
    // find by userId (ObjectId or whatever the schema expects)
    return await cartModel.findOne({ userId: normalizedUserId });
  } else if (guestId) {
    return await cartModel.findOne({ guestId });
  }
  
};

/* ----------------------
   POST /api/cart
   Add item to cart (public)
   body: { productId, quantity, size, color, guestId, userId }
   ---------------------- */
router.post("/", async (req, res) => {
  try {
    const { productId, quantity = 1, size, color, guestId, userId } = req.body;

    const product = await productModel.findById(productId);
    if (!product) return res.status(403).json({ message: "Product does not exist" });

    const cart = await findcart(userId, guestId);

    // normalize the productId we'll store/compare with
    const normalizedProductId = toObjectIdIfValid(productId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === String(product._id) &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        cart.products.push({
          productId: normalizedProductId,
          name: product.name,
          image: product.images && product.images[0] ? product.images[0].url : "",
          price: product.price,
          size,
          color,
          quantity: Number(quantity),
        });
      }

      // recalculate total price
      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // create new cart
      const normalizedUserId = toObjectIdIfValid(userId);
      const effectiveGuestId = guestId ? guestId : "guest_" + new Date().getTime();

      const newCart = await cartModel.create({
        userId: normalizedUserId ? normalizedUserId : undefined,
        guestId: normalizedUserId ? undefined : effectiveGuestId,
        products: [
          {
            productId: normalizedProductId,
            name: product.name,
            image: product.images && product.images[0] ? product.images[0].url : "",
            price: product.price,
            size,
            quantity: Number(quantity),
            color,
          },
        ],
        totalPrice: product.price * Number(quantity),
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return res.status(500).send("Server Error");
  }
});

/* ----------------------
   PUT /api/cart
   Update quantity or remove item (public)
   body: { userId, guestId, productId, size, color, quantity }
   ---------------------- */
router.put("/", async (req, res) => {
  try {
    const { userId, guestId, productId, size, color, quantity } = req.body;

    const cart = await findcart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart Not Found" });

    const prodIdStr = productId && typeof productId === "object" && productId._id ? String(productId._id) : String(productId);

    const findIndex = cart.products.findIndex(
      (p) => p.productId.toString() === prodIdStr && p.size === size && p.color === color
    );

    if (findIndex > -1) {
      if (Number(quantity) > 0) {
        cart.products[findIndex].quantity = Number(quantity);
      } else {
        // remove item
        cart.products.splice(findIndex, 1);
      }

      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("PUT /api/cart error:", error);
    return res.status(500).send("Server Error");
  }
});

/* ----------------------
   DELETE /api/cart
   Delete specific product from cart (public)
   body: { userId, guestId, productId, color, size }
   ---------------------- */
router.delete("/", async (req, res) => {
  try {
    const { userId, guestId, productId, color, size } = req.body;

    const cart = await findcart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart Not Found" });

    const prodIdStr = productId && typeof productId === "object" && productId._id ? String(productId._id) : String(productId);

    const findIndex = cart.products.findIndex(
      (p) => p.productId.toString() === prodIdStr && p.color === color && p.size === size
    );

    if (findIndex > -1) {
      cart.products.splice(findIndex, 1);
      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return res.status(500).send("Server Error");
  }
});

/* ----------------------
   GET /api/cart
   Fetch cart (public)
   query: ?userId=...&guestId=...
   ---------------------- */
router.get("/", async (req, res) => {
  try {
    const { userId, guestId } = req.query;
    console.log("Visited");
    const cart = await findcart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart Not Found" });
    return res.status(200).json(cart);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return res.status(500).send("Server Error");
  }
});

/* ----------------------
   POST /api/cart/merge
   Merge guestCart into userCart on login/register (protected)
   body: { guestId, userId }
   ---------------------- */
router.post("/merge", protect, async (req, res) => {
  try {
    let { guestId, userId } = req.body;

    // ✅ Ensure userId is an ObjectId if it's a valid one
    if (mongoose.isValidObjectId(userId)) {
      userId = new mongoose.Types.ObjectId(userId);
    }

    console.log("Merging carts:", { guestId, userId });

    const guestCart = await cartModel.findOne({ guestId });
    const userCart = await cartModel.findOne({ userId });

    if (guestCart) {
      if (userCart) {
        console.log("Merging guestCart into userCart");

        guestCart.products.forEach((item) => {
          const index = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === item.productId.toString() &&
              p.size === item.size &&
              p.color === item.color
          );

          if (index > -1) {
            userCart.products[index].quantity += item.quantity;
          } else {
            userCart.products.push(item);
          }
        });

        // ✅ Recalculate total
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        await userCart.save();
        await cartModel.findOneAndDelete({ guestId });

        console.log("✅ Merge successful: Saved userCart, deleted guestCart");
        return res.status(200).json(userCart);
      } else {
        console.log("No userCart found, converting guestCart → userCart");

        guestCart.userId = userId;
        guestCart.guestId = undefined;

        // ✅ Convert to plain object before modifying
        await guestCart.save();

        console.log("✅ GuestCart converted to userCart");
        return res.status(200).json(guestCart);
      }
    } else if (userCart) {
      console.log("Guest cart not found, returning existing userCart");
      return res.status(200).json(userCart);
    } else {
      console.log("No guestCart or userCart found");
      return res.status(404).json({ message: "No carts found to merge" });
    }
  } catch (error) {
    console.error("❌ Merge cart error:", error);
    res.status(500).send("Server error");
  }
});
export default router;
