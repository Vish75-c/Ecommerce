import { Router } from "express";
import cartModel from "../models/Cart.js";
import productModel from "../models/Product.js";
import protect from "../middleware/authmiddleware.js";

const router = Router();

// normalize helper
const norm = (id) => {
  if (!id) return undefined;
  if (typeof id === "object" && id._id) return id._id.toString();
  return id.toString();
};

// find cart helper
const findCart = async (userId, guestId) => {
  if (userId) {
    const userCart = await cartModel.findOne({ userId });
    if (userCart) return userCart;
  }
  if (guestId) {
    return await cartModel.findOne({ guestId });
  }
  return null;
};

/* ---------------------------------------------------------
   POST /api/cart
   Add item / merge guest cart
---------------------------------------------------------- */
router.post("/", async (req, res) => {
  try {
    let { productId, quantity = 1, size, color, guestId, userId } = req.body;
    quantity = Number(quantity) || 1;

    const uid = norm(userId);
    const gid = norm(guestId);

    // validate product
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // if both user and guest present => merge guest into user
    if (uid && gid) {
      const guestCart = await cartModel.findOne({ guestId: gid });
      const userCart = await cartModel.findOne({ userId: uid });

      if (guestCart && !userCart) {
        // convert guestCart into userCart
        guestCart.userId = uid;
        guestCart.guestId = undefined;
        guestCart.totalPrice = guestCart.products.reduce(
          (acc, it) => acc + it.price * it.quantity,
          0
        );
        await guestCart.save();
      } else if (guestCart && userCart) {
        // merge guest items into user cart
        guestCart.products.forEach((gItem) => {
          const idx = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === gItem.productId.toString() &&
              p.size === gItem.size &&
              p.color === gItem.color
          );
          if (idx > -1) {
            userCart.products[idx].quantity += gItem.quantity;
          } else {
            userCart.products.push(gItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, it) => acc + it.price * it.quantity,
          0
        );
        await userCart.save();
        await cartModel.deleteOne({ _id: guestCart._id });
      }
    }

    // always prefer user cart if logged in
    let cart = await findCart(uid, gid);

    if (cart) {
      // ensure correct ownership if user is logged in
      if (uid && !cart.userId) {
        cart.userId = uid;
        cart.guestId = undefined;
      }

      // check if product already in cart
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === product._id.toString() &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images?.[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      // create new cart
      const newCart = await cartModel.create({
        userId: uid || undefined,
        guestId: uid ? undefined : gid || `guest_${Date.now()}`,
        products: [
          {
            productId,
            name: product.name,
            image: product.images?.[0]?.url || "",
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error("POST /api/cart error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ---------------------------------------------------------
   POST /api/cart/merge (after login)
---------------------------------------------------------- */
router.post("/merge", protect, async (req, res) => {
  try {
    const guestId = norm(req.body.guestId);
    const userId = req.user._id.toString();

    if (!guestId) return res.status(400).json({ message: "guestId required" });

    const guestCart = await cartModel.findOne({ guestId });
    let userCart = await cartModel.findOne({ userId });

    if (!guestCart && !userCart) {
      return res.status(200).json({ products: [], totalPrice: 0, userId });
    }

    if (guestCart && !userCart) {
      guestCart.userId = userId;
      guestCart.guestId = undefined;
      await guestCart.save();
      return res.status(200).json(guestCart);
    }

    if (guestCart && userCart) {
      guestCart.products.forEach((gItem) => {
        const idx = userCart.products.findIndex(
          (p) =>
            p.productId.toString() === gItem.productId.toString() &&
            p.size === gItem.size &&
            p.color === gItem.color
        );
        if (idx > -1) {
          userCart.products[idx].quantity += gItem.quantity;
        } else {
          userCart.products.push(gItem);
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (acc, it) => acc + it.price * it.quantity,
        0
      );
      await userCart.save();
      await cartModel.deleteOne({ _id: guestCart._id });
      return res.status(200).json(userCart);
    }

    return res.status(200).json(userCart);
  } catch (error) {
    console.error("POST /api/cart/merge error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
