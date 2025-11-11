
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paypalbtn from "./Paypalbtn";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState("");
  const [shipping, setShipping] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postal: "",
    country: "",
    phonenumber: "",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress: shipping,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );

      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      } else {
        console.error("Checkout creation failed:", res);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        await handleFinalizeCheckout(checkoutId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/order-confirmation");
      } else {
        console.log("Checkout finalization failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading Cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your Cart is Empty</p>;
  }

  return (
    <div className="px-6 py-6 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 tracking-tighter">
      {/* Left side - Shipping info */}
      <div className="p-8 space-y-2">
        <h1 className="mb-4 font-medium text-2xl uppercase">Checkout</h1>
        <h3 className="mb-4 font-medium text-lg">Contact Details</h3>

        <div className="flex flex-col mb-3">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={user ? user.email : ""}
            disabled
            className="p-1 border text-gray-500 border-gray-200 rounded-sm bg-gray-50"
          />
        </div>

        <p className="text-lg mb-4">Delivery</p>
        <form onSubmit={handleCreateCheckout} className="text-gray-500">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex flex-col">
              <label className="block mb-1 text-gray-500">First name</label>
              <input
                type="text"
                name="firstname"
                value={shipping.firstname}
                onChange={handleChange}
                className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-gray-500">Last name</label>
              <input
                type="text"
                name="lastname"
                value={shipping.lastname}
                onChange={handleChange}
                className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label className="block mb-1 text-gray-500">Address</label>
            <input
              type="text"
              name="address"
              value={shipping.address}
              onChange={handleChange}
              className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex flex-col">
              <label className="block mb-1 text-gray-500">City</label>
              <input
                type="text"
                name="city"
                value={shipping.city}
                onChange={handleChange}
                className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-gray-500">Postal Code</label>
              <input
                type="text"
                name="postal"
                value={shipping.postal}
                onChange={handleChange}
                className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200"
              />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="block mb-1 text-gray-500">Country</label>
            <input
              type="text"
              name="country"
              value={shipping.country}
              onChange={handleChange}
              className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label className="block mb-1 text-gray-500">Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              value={shipping.phonenumber}
              onChange={handleChange}
              className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200"
            />
          </div>

          {checkoutId.length === 0 ? (
            <button
              type="submit"
              className="text-white bg-black rounded-sm w-full p-2"
            >
              Continue to Payment
            </button>
          ) : (
            <div>
              <h1 className="mb-2">Pay Using PayPal</h1>
              <Paypalbtn
                amount={cart.totalPrice}
                onSuccess={handlePaymentSuccess}
                onError={() => alert("Payment Failed")}
              />
            </div>
          )}
        </form>
      </div>

      {/* Right side - Order Summary */}
      <div className="w-full p-6 bg-gray-50 rounded-lg flex flex-col">
        <h1 className="text-2xl font-semibold mb-10">Order Summary</h1>
        {cart.products.map((item, index) => (
          <div
            key={index}
            className="w-full py-2 flex items-start border-b border-gray-200"
          >
            <div className="mr-4">
              <img
                src={item.image}
                alt="item-image"
                className="w-20 h-20 rounded-lg object-cover"
              />
            </div>
            <div className="flex justify-between w-full">
              <div>
                <h1 className="text-lg font-bold text-black opacity-80">
                  {item.name}
                </h1>
                <p className="text-gray-500">Size: {item.size}</p>
                <p className="text-gray-500">Color: {item.color}</p>
              </div>
              <span className="text-md font-semibold">
                ${item.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-10 w-full">
          <span className="text-lg font-semibold">Subtotal</span>
          <span className="text-lg font-semibold">
            ${cart.totalPrice.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between mt-5 w-full">
          <span className="text-lg font-semibold">Shipping</span>
          <span className="text-lg font-semibold">Free</span>
        </div>
        <div className="flex justify-between mt-5 border-t border-gray-600 w-full pt-4">
          <span className="text-xl font-semibold">Total</span>
          <span className="text-xl font-semibold">
            ${cart.totalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
