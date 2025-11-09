import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { toast } from "react-toastify";
import Projectgrid from "../Layout/Projectgrid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { ToastContainer } from "react-toastify";

const Product = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error,similarProducts } = useSelector((state) => state.products);
  const { userId ,guestId} = useSelector((state) => state.auth);

  const [mainImg, setMainImg] = useState(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [disable, setDisable] = useState(false);

  // Unified ID for route or prop
  const productFetchId = productId || id;
  // Fetch product details
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  // Set main image when product loads
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct.images[0].url);
    }
    
  }, [selectedProduct]);

  // Quantity handlers
  const handleQuantity = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Add to cart
  const handleCart = async () => {
    if (!size || !color) {
      toast.warn("Select Size and Color of the Product!", { position: "top-right", autoClose: 2000, theme: "dark" });
      return;
    }

    setDisable(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size,
        color,
        guestId,
        userId: userId?._id,

  
      })
    )
      .then(() => {
        toast.success("Added to the cart!", { position: "top-right", autoClose: 2000, theme: "dark" });
      })
      .finally(() => setDisable(false));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {selectedProduct && (
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto rounded-lg space-x-6 mb-10">
          {/* Image gallery */}
          <div className="hidden md:flex md:flex-col space-y-2">
            {selectedProduct.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.Alttext || selectedProduct.name}
                onClick={() => setMainImg(img.url)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                  mainImg === img.url ? "border-2 border-black" : ""
                }`}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="w-full md:w-1/2 mb-4">
            <img src={mainImg} alt={selectedProduct.name} className="w-full rounded-lg object-cover" />
          </div>

          {/* Mobile gallery */}
          <div className="flex md:hidden mb-4 space-x-2">
            {selectedProduct.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.Alttext || selectedProduct.name}
                onClick={() => setMainImg(img.url)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                  mainImg === img.url ? "border-2 border-black" : ""
                }`}
              />
            ))}
          </div>

          {/* Product info */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="text-2xl font-bold mb-2">{selectedProduct.name}</h1>
            <p className="text-gray-500 mb-1 line-through">
              ${selectedProduct.discountPrice || selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-1">${selectedProduct.price}</p>
            <p className="text-gray-600 mb-2">{selectedProduct.description}</p>

            {/* Color selector */}
            <span className="text-gray-500 mb-1">Color:</span>
            <div className="flex space-x-2 mb-2">
              {selectedProduct.colors?.map((c, index) => (
                <button
                  key={index}
                  onClick={() => setColor(c)}
                  className={`rounded-full h-7 w-7 border ${
                    color === c ? "border-black" : "border-gray-700"
                  }`}
                  style={{ backgroundColor: c.toLowerCase() }}
                />
              ))}
            </div>

            {/* Size selector */}
            <span className="text-gray-500 mb-1">Size:</span>
            <div className="flex space-x-2 mb-2">
              {selectedProduct.sizes?.map((s, index) => (
                <button
                  key={index}
                  onClick={() => setSize(s)}
                  className={`py-1 px-3 border ${
                    size === s ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Quantity selector */}
            <span className="text-gray-500 mb-1">Quantity:</span>
            <div className="flex items-center space-x-2 mb-4">
              <button className="py-2 px-2 border bg-gray-200" onClick={() => handleQuantity("minus")}>
                <HiMinus />
              </button>
              <span>{quantity}</span>
              <button className="py-2 px-2 border bg-gray-200" onClick={() => handleQuantity("plus")}>
                <HiPlus />
              </button>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleCart}
              disabled={disable}
              className="w-full py-2 mb-4 rounded-lg bg-black text-white"
            >
              ADD TO CART
            </button>

            {/* Characteristics */}
            <p className="font-bold text-lg mb-4">Characteristics:</p>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1">Brand</td>
                  <td className="py-1 text-gray-600">{selectedProduct.brand}</td>
                </tr>
                <tr>
                  <td className="py-1">Material</td>
                  <td className="py-1 text-gray-600">{selectedProduct.material}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Similar products */}
       {similarProducts?.length > 0 && (
        <div className="max-w-6xl mx-auto flex flex-col justify-center">
          <h1 className="text-center font-bold text-2xl mb-5">You May Also Like</h1>
          <Projectgrid product={similarProducts} />
        </div>
      )} 
    </div>
  );
};

export default Product;
