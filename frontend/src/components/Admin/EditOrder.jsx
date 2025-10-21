import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EditOrder = () => {
  const { id } = useParams();
  const [productdata, setproductdata] = useState({
    name: "",
    description: "",
    countinstock: 0,
    sku: "",
    price: 0,
    category: "",
    brand: "",
    sizes: [],
    color: [],
    collections: "",
    material: "",
    gender: "",
    image: [
      { url: "https://picsum.photos/150?random=1" },
      { url: "https://picsum.photos/150?random=2" },
    ],
  });

  const handlechange = (e) => {
    const dub = { ...productdata };
    dub[e.target.name] = e.target.value;
    setproductdata(dub);
  };

  // file upload handler
  const handlefileupload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedImages = [...productdata.image];
    updatedImages[index] = { url: URL.createObjectURL(file) };

    setproductdata({ ...productdata, image: updatedImages });
  };

  // Upload button handler
  const handleUpload = (e) => {
    e.preventDefault();
    console.log("✅ Product Data:", productdata);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 flex flex-col shadow-lg rounded-xl bg-white">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-900">Edit Product</h1>

      <form onSubmit={handleUpload}>
        {/* Name */}
        <div className="flex flex-col mb-3">
          <label className="font-semibold mb-2 text-black">Name</label>
          <input
            type="text"
            required
            name="name"
            value={productdata.name}
            onChange={handlechange}
            className="p-2 text-gray-700 w-full border rounded-md outline-none border-gray-300 
                       focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col mb-3">
          <label className="font-semibold mb-2 text-black">Description</label>
          <textarea
            required
            name="description"
            rows={4}
            value={productdata.description}
            onChange={handlechange}
            className="p-2 text-gray-700 w-full border rounded-md outline-none border-gray-300 
                       focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col mb-3">
          <label className="font-semibold mb-2 text-black">Price</label>
          <input
            type="number"
            required
            name="price"
            value={productdata.price}
            onChange={handlechange}
            className="p-2 text-gray-700 w-full border rounded-md outline-none border-gray-300 
                       focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        {/* Count in Stock */}
        <div className="flex flex-col mb-3">
          <label className="font-semibold mb-2 text-black">Count in Stock</label>
          <input
            type="number"
            required
            name="countinstock"
            value={productdata.countinstock}
            onChange={handlechange}
            className="p-2 text-gray-700 w-full border rounded-md outline-none border-gray-300 
                       focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        {/* SKU */}
        <div className="flex flex-col mb-3">
          <label className="font-semibold mb-2 text-black">SKU</label>
          <input
            type="text"
            required
            name="sku"
            value={productdata.sku}
            onChange={handlechange}
            className="p-2 text-gray-700 w-full border rounded-md outline-none border-gray-300 
                       focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col mb-6">
          <label className="font-bold mb-3 text-black">Image Upload</label>

          <div className="flex items-center gap-6 flex-wrap">
            {/* Upload 1 */}
            <input
              type="file"
              onChange={(e) => handlefileupload(e, 0)}
              className="block w-[220px] cursor-pointer rounded-lg border border-gray-300 bg-gray-50 
                         text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 
                         file:bg-blue-600 file:px-4 file:py-2 file:text-white 
                         file:font-medium hover:file:bg-blue-700 transition-all duration-200"
            />

            {/* Upload 2 */}
            <input
              type="file"
              onChange={(e) => handlefileupload(e, 1)}
              className="block w-[220px] cursor-pointer rounded-lg border border-gray-300 bg-gray-50 
                         text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 
                         file:bg-blue-600 file:px-4 file:py-2 file:text-white 
                         file:font-medium hover:file:bg-blue-700 transition-all duration-200"
            />
          </div>

          {/* Show product images */}
          <div className="flex gap-4 mt-4">
            {productdata.image.map((img, i) => (
              <div
                key={i}
                className="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={img.url}
                  alt={`Product ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 
                     rounded-lg shadow-md transition-all duration-300"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default EditOrder;
