import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { toast } from "react-toastify";
import Projectgrid from "../Layout/Projectgrid";
const Product = () => {
  const selectedproduct = {
    name: "Stylish Jeans",
    price: 120,
    originalprice: 150,
    description: "This is stylish jeans for an occasion",
    brand: "FashionBrand",
    material: "Leader",
    size: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        Alttext: "Stylish Jeans 1",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        Alttext: "Stylish Jeans 2",
      },
    ],
  };
  const arr=[
    {id:1,name:"Product 1",image:{url:"https://picsum.photos/500/500?random=10",AltText:"Product"},price:"190"},
    {id:2,name:"Product 2",image:{url:"https://picsum.photos/500/500?random=11",AltText:"Product"},price:"200"},
    {id:2,name:"Product 3",image:{url:"https://picsum.photos/500/500?random=12",AltText:"Product"},price:"600"},
    {id:2,name:"Product 4",image:{url:"https://picsum.photos/500/500?random=13",AltText:"Product"},price:"930"}
  ]
  const [mainImg, setmainImg] = useState(null);
  const [color, setcolor] = useState("");
  const [size, setsize] = useState("");
  const [quantity, setquantity] = useState(1);
  const [disable, setdisable] = useState(false);
  useEffect(() => {
    if (selectedproduct.images.length > 0) {
      setmainImg(selectedproduct.images[0].url);
    }
  }, []);
  const handlequantity = (action) => {
    if (action === "plus") setquantity(quantity + 1);
    if (action === "minus" && quantity > 1) setquantity(quantity - 1);
  };
  const handlecart = async () => {
    console.log("clicked ");
    if (size === "" || color === "") {
      toast.warn("Select Size and Color of the Product!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    toast.success("Added to the cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    setdisable(true);
    setInterval(() => {
      setdisable(false);
    }, 2000);
  };
  return (
    <div className="p-6">
      <div className="flex mx-auto flex-col  md:flex-row max-w-6xl rounded-lg space-x-6 mb-10 ">
        <div className="hidden md:flex  md:flex-col space-y-2">
          {selectedproduct.images.map((item, index) => {
            return (
              <img
                key={index}
                onClick={() => setmainImg(item.url)}
                src={item.url}
                alt={item.Alttext}
                className={`w-20 h-20 object-cover rounded-lg ${
                  mainImg === item.url ? "border-2 border-black " : ""
                }`}
              />
            );
          })}
        </div>
        <div className="w-full md:w-1/2 mb-4">
          <img
            src={mainImg}
            alt="Main Product"
            className="block rounded-lg object-cover w-full"
          />
        </div>
        {/* Mobile Navigation */}

        <div className="flex flex-row md:hidden mb-4 space-x-2">
          {selectedproduct.images.map((item, index) => {
            return (
              <img
                key={index}
                src={item.url}
                onClick={() => setmainImg(item.url)}
                alt={item.Alttext}
                className={`block w-20 h-20 object-cover rounded-lg ${
                  mainImg === item.url ? "border-2 border-black" : ""
                }`}
              />
            );
          })}
        </div>
        {/* Right Side */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-2xl font-bold mb-2">{selectedproduct.name}</h1>
          <p className="text-gray-500 mb-1 line-through ">
            ${selectedproduct.originalprice}
          </p>
          <p className="text-gray-600 mb-1">${selectedproduct.price}</p>
          <p className="text-gray-600 mb-2">{selectedproduct.description}</p>

          <span className="mb-1 text-gray-500">Color:</span>
          <div className="space-x-2 mb-2">
            {selectedproduct.colors.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setcolor(item)}
                  className={`rounded-full h-7 w-7  ${
                    color === item
                      ? "border-2 border-black"
                      : "border border-gray-700"
                  }`}
                  style={{
                    backgroundColor: item.toLocaleLowerCase(),
                    filter: "brightness",
                  }}
                ></button>
              );
            })}
          </div>
          <span className="mb-1 text-gray-500">Size:</span>
          <div className="space-x-2 mb-2">
            {selectedproduct.size.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setsize(item)}
                  className={`border border-gray-200   py-1 px-3 ${
                    size === item
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <span className="mb-1 text-gray-500">Quantity:</span>
          <div className="space-x-2 mb-4 flex items-center">
            <button
              className="border border-gray-500 bg-gray-200  py-2 px-2"
              onClick={() => handlequantity("minus")}
            >
              <HiMinus />
            </button>
            <span>{quantity}</span>
            <button
              className="border border-gray-500 bg-gray-200  py-2 px-2"
              onClick={() => handlequantity("plus")}
            >
              <HiPlus />
            </button>
          </div>
          <button
            onClick={() => handlecart()}
            disabled={disable}
            className="py-2 w-full text-white bg-black rounded-lg mb-4"
          >
            ADD TO CART
          </button>

          <p className=" mb-4 font-bold text-lg">Characteristics:</p>
          <table className="w-full">
            <tbody className="text-sm">
              <tr className="">
                <td className="py-1">Brand</td>
                <td className="text-gray-600 py-1 ">{selectedproduct.brand}</td>
              </tr>
              <tr>
                <td className="py-1">Material</td>
                <td className="text-gray-600 py-1">
                  {selectedproduct.material}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
       
      </div>
       <div className="max-w-6xl flex flex-col mx-auto justify-center">
          <h1 className="text-center font-bold text-2xl mb-5">You May Also Like</h1>
          <Projectgrid product={arr}/>
        </div>
    </div>
  );
};

export default Product;
