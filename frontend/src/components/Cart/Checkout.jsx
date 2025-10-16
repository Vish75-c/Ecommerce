import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Paypalbtn from "./Paypalbtn";
const Checkout = () => {
  const cart={
     product:[
      {
        name:"Stylish Jacket",
        size:"M",
        color:"Black",
        price:120,
        image:"https://picsum.photos/150?random=1"   
      },
       {
        name:"Denim Sneakers",
        size:"L",
        color:"Black",
        price:130,
        image:"https://picsum.photos/150?random=2"   
       }
    ],
    totalprice:250,
  }
    const navigate=useNavigate();
  const [shippingid, setshippingid] = useState("");
  const [shipping, setshipping] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postal: "",
    country: "",
    phonenumber: "",
  });
  const handlechange = (e) => {
    const dub = { ...shipping };
    dub[e.target.name] = e.target.value;
    setshipping(dub);
  };
  const handlesubmit = (e) => {
    console.log(shippingid);
    e.preventDefault();
    setshippingid("123");
  };
  const handlesuccess=()=>{
    console.log("Confirmed")
    navigate('/order-confirmation')
  }
  return (
    <div className="px-6 py-6  mx-auto max-w-7xl grid  grid-cols-1 lg:grid-cols-2  tracking-tighter">
      <div className=" p-8  space-y-2 ">
        <h1 className="mb-4 font-medium text-2xl uppercase">Checkout</h1>
        <h3 className="mb-4 font-medium text-lg">Contact Details</h3>
        <div className="flex flex-col mb-3">
          <label className="block mb-1 ">Email</label>
          <input
            type="email"
            value="abc@example.com"
            disabled
            className="p-1 border text-gray-500 border-gray-200 rounded-sm bg-gray-50 "
          />
        </div>
        <p className="text-lg mb-4">Delivery</p>
        <form onSubmit={handlesubmit} className="text-gray-500">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex flex-col">
              <label className="block mb-1 text-gray-500">First name</label>
              <input
                type="text"
                name="firstname"
                value={shipping["firstname"]}
                onChange={handlechange}
                className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200 "
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-gray-500">Last name</label>
              <input
                name="lastname"
                value={shipping["lastname"]}
                onChange={handlechange}
                type="text"
                className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200 "
              />
            </div>
          </div>
          {/* Address */}
          <div className="flex flex-col mb-4">
            <label className="block mb-1 text-gray-500">Address</label>
            <input
              name="address"
              value={shipping["address"]}
              onChange={handlechange}
              type="text"
              className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200 "
            />
          </div>
          {/*  City+Postal  */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex flex-col">
              <label className="block mb-1 text-gray-500">City</label>
              <input
                name="city"
                value={shipping["city"]}
                onChange={handlechange}
                type="text"
                className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200 "
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-1 text-gray-500">Postal Code</label>
              <input
                name="postal"
                value={shipping["postal"]}
                onChange={handlechange}
                type="text"
                className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200 "
              />
            </div>
          </div>
          {/* Country */}
          <div className="flex flex-col mb-6">
            <label className="block mb-1 text-gray-500">Country</label>
            <input
              name="country"
              value={shipping["country"]}
              onChange={handlechange}
              type="text"
              className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200 "
            />
          </div>
          {/* Phone Number */}
          <div className="flex flex-col mb-6">
            <label className="block mb-1 text-gray-500">Phone Number</label>
            <input
              name="phonenumber"
              value={shipping["phonenumber"]}
              onChange={handlechange}
              type="text"
              className="p-1 border border-gray-200 rounded-sm focus:ring-1 outline-none focus:ring-gray-200 "
            />
          </div>
          {shippingid.length == 0 ? (
            <button onClick={handlesuccess} className="text-white opacity-55 bg-black rounded-sm w-full p-2">
              Continue to Payment
            </button>
          ) : (
            <div>
              <h1>Pay Using paypal</h1>
              {/* <Paypalbtn amount={100} onSuccess={handlesuccess} onError={(err)=>alert("Payment Failed")}/> */}
            </div>
          )}
        </form>
      </div>
      <div className="w-full p-6 bg-gray-50 rounded-lg flex flex-col">
        <h1 className="text-2xl font-semibold mb-10">Order Summary</h1>
        {cart.product.map((item,index)=>{
          return (
            <div key={index} className="w-full py-2 flex items-start border-b border-gray-200">
              <div className="mr-4 ">
                <img src={item.image} alt="item-image" className="w-20 h-20 rounded-lg object-cover"/>
              </div>
              <div className="flex justify-between w-full">
                <div  >
                  <h1 className="text-lg  font-bold text-black opacity-80">{item.name}</h1>
                  <p className=" text-gray-500 ">Size:{item.size}</p>
                  <p className="text-gray-500 ">Color:{item.color}</p>
                </div>
                <span className="text-md font-semibold">${item.price.toLocaleString()}</span>
              </div>
            </div>
          )
        })}
        <div className="flex justify-between mt-10 w-full ">
          <span className="text-lg font-semibold">Subtotal</span>
          <span className="text-lg font-semibold">${cart.totalprice}</span>
        </div>
        <div className="flex justify-between mt-5 w-full ">
          <span className="text-lg font-semibold">Shipping</span>
          <span className="text-lg font-semibold">Free</span>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
