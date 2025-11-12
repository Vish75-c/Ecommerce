import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Paypalbtn from "./Paypalbtn"; // keep if you re-enable real PayPal
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
    postalCode: "",
    country: "",
    phonenumber: "",
  });

  // Guards to prevent duplicate actions
  const [isCreating, setIsCreating] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    setShipping((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Only called by form submit (onSubmit)
  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    if (isCreating) return; // prevent double submit
    if (!cart || !cart.products || cart.products.length === 0) return;

    // Basic validation
    if (
      !shipping.address ||
      !shipping.city ||
      !shipping.postalCode ||
      !shipping.country
    ) {
      alert("Please fill all required shipping address fields");
      return;
    }

    try {
      setIsCreating(true);

      const res = await dispatch(
        createCheckout({
          checkoutItem: cart.products,
          shippingAddress: {
            address: shipping.address,
            city: shipping.city,
            postalCode: shipping.postalCode,
            country: shipping.country,
            phonenumber: shipping.phonenumber,
            firstname: shipping.firstname,
            lastname: shipping.lastname,
          },
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );

      // createCheckout resolved
      if (res.payload && res.payload._id) {
        console.log("✅ Checkout created:", res.payload._id);
        setCheckoutId(res.payload._id);
      } else {
        console.error("❌ Checkout creation failed:", res);
        alert("Failed to create checkout. See console.");
      }
    } catch (err) {
      console.error("❌ createCheckout error:", err);
      alert("Failed to create checkout. See console.");
    } finally {
      setIsCreating(false);
    }
  };

  // Payment handler: does NOT accept the click event.
  const handlePaymentSuccess = async () => {
    if (!checkoutId) {
      alert("No checkout created yet. Click Continue to Payment first.");
      return;
    }
    if (isPaying) return; // prevent double payment calls

    try {
      setIsPaying(true);

      // Use a safe, serializable mock paymentDetails object.
      // Replace with real PayPal details when integrating the real SDK.
      const paymentDetails = {
        provider: "mock-paypal",
        transactionId: `mock_tx_${Date.now()}`,
        amount: cart?.totalPrice || 0,
      };

      const response = await axios.put(
        `http://localhost:3000/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // finalize order on server
        await handleFinalizeCheckout(checkoutId);
      } else {
        console.error("Unexpected response updating payment:", response);
        alert("Payment update failed. See console.");
      }
    } catch (error) {
      console.error("❌ Payment update error:", error);
      // If you previously saw a 404, ensure your backend route PUT /api/checkout/:id/pay exists
      alert("Payment update failed. See console for details.");
    } finally {
      setIsPaying(false);
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
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigate("/order-confirmation");
      } else {
        console.error("Checkout finalization failed:", response);
        alert("Checkout finalization failed. See console.");
      }
    } catch (error) {
      console.error("❌ Finalize error:", error);
      alert("Checkout finalization failed. See console.");
    }
  };

  if (loading) return <p>Loading Cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your Cart is Empty</p>;
  }

  return (
    <div className="px-6 py-6 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 tracking-tighter">
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

        {/* Only onSubmit triggers createCheckout */}
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
                name="postalCode"
                value={shipping.postalCode}
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
              disabled={isCreating}
              className={`text-white bg-black rounded-sm w-full p-2 ${
                isCreating ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isCreating ? "Creating..." : "Continue to Payment"}
            </button>
          ) : (
            <div>
              <h1 className="mb-2">Pay Using PayPal</h1>

              {/* Mock PayPal button — type="button" prevents form submit and we call handler with safe payload */}
              <button
                type="button"
                onClick={() => handlePaymentSuccess()}
                disabled={isPaying}
                className={`w-[50%] p-1 font-bold bg-yellow-200 rounded-2xl text-black ${
                  isPaying ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isPaying ? "Processing..." : "Paypal"}
              </button>
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
                alt="item"
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
