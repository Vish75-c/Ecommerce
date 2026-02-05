import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { toast, ToastContainer } from "react-toastify";
import Projectgrid from "../Layout/Projectgrid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { motion } from "framer-motion";

const Product = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
  const { userId, guestId } = useSelector((state) => state.auth);

  const [mainImg, setMainImg] = useState(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [disable, setDisable] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantity = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

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
    <div className="p-6 mt-10">
      <ToastContainer />

      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row max-w-6xl mx-auto rounded-lg space-x-6 mb-16"
        >
          {/* Sidebar Thumbnails */}
          <div className="hidden md:flex md:flex-col space-y-3">
            {selectedProduct.images?.map((img, index) => (
              <motion.img
                key={index}
                src={img.url}
                alt={img.Alttext || selectedProduct.name}
                whileHover={{ scale: 1.05 }}
                onClick={() => setMainImg(img.url)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                  mainImg === img.url ? "border-2 border-black" : "border border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full md:w-1/2 mb-4"
          >
            <img src={mainImg} alt={selectedProduct.name} className="w-full rounded-xl shadow-md object-cover" />
          </motion.div>

          {/* Mobile Thumbnails */}
          <div className="flex md:hidden mb-4 space-x-2">
            {selectedProduct.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.Alttext || selectedProduct.name}
                onClick={() => setMainImg(img.url)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                  mainImg === img.url ? "border-2 border-black" : "border border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-extrabold mb-2"
            >
              {selectedProduct.name}
            </motion.h1>

            <p className="text-gray-400 line-through">${selectedProduct.discountPrice || selectedProduct.price}</p>
            <p className="text-gray-800 text-xl font-semibold">${selectedProduct.price}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{selectedProduct.description}</p>

            {/* Colors */}
            <div className="mt-3">
              <span className="text-gray-500 font-medium">Color:</span>
              <div className="flex space-x-2 mt-1">
                {selectedProduct.colors?.map((c, index) => (
                  <button
                    key={index}
                    onClick={() => setColor(c)}
                    className={`rounded-full h-8 w-8 border-2 transition-all duration-200 ${
                      color === c ? "border-black scale-110" : "border-gray-400"
                    }`}
                    style={{ backgroundColor: c.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-2">
              <span className="text-gray-500 font-medium">Size:</span>
              <div className="flex space-x-2 mt-1">
                {selectedProduct.sizes?.map((s, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(s)}
                    className={`py-1 px-3 rounded-md border text-sm transition-all duration-200 ${
                      size === s
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-400 hover:border-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-4">
              <span className="text-gray-500 font-medium">Quantity:</span>
              <div className="flex items-center space-x-3 mt-2">
                <button className="p-2 border bg-gray-100 hover:bg-gray-200 rounded" onClick={() => handleQuantity("minus")}>
                  <HiMinus />
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button className="p-2 border bg-gray-100 hover:bg-gray-200 rounded" onClick={() => handleQuantity("plus")}>
                  <HiPlus />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCart}
              disabled={disable}
              className="mt-6 w-full py-3 rounded-lg bg-black text-white font-semibold tracking-wide shadow-md hover:bg-gray-900 transition"
            >
              ADD TO CART
            </motion.button>

            {/* Details */}
            <div className="mt-4">
              <p className="font-bold text-lg mb-2">Characteristics:</p>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-1 text-gray-700">Brand</td>
                    <td className="py-1 text-gray-500">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-700">Material</td>
                    <td className="py-1 text-gray-500">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Similar Products */}
      {similarProducts?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto flex flex-col justify-center"
        >
          <h1 className="text-center font-bold text-2xl mb-6">You May Also Like</h1>
          <Projectgrid product={similarProducts} />
        </motion.div>
      )}
    </div>
  );
};

export default Product;
