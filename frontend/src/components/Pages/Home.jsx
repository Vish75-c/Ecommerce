import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Hero from "../Layout/Hero";
import GenderCollection from "../Projects/GenderCollection";
import NewArrivals from "../Projects/NewArrivals";
import Product from "../Common/Product";
import { ToastContainer } from "react-toastify";
import Projectgrid from "../Layout/Projectgrid";
import Features from "../Layout/Features";
import featureImg from "../../assets/featured.webp";
import { Link } from "react-router-dom";
import {fetchProductsByFilters} from "../../redux/slices/productsSlice.js" // adjust the path to your slice

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState([]);

  useEffect(() => {
    // Fetch products for Women Bottom Wear
    dispatch(fetchProductsByFilters({
      gender: "Women",
      category: "Bottom Wear",
      limit: 8
    }));

    // Fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product/best-seller');
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
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

      <div className="fixed top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>

      <Hero />
      <GenderCollection />
      <NewArrivals />

      <h1 className="text-3xl font-bold text-black text-center mt-10">
        Best Seller
      </h1>
      {bestSellerProduct&&<Product productId={bestSellerProduct._id} />}

      <div className="container mx-auto p-6 md:p-20">
        <h2 className="text-3xl font-bold text-center mb-6">
          Top Wear for Women's
        </h2>
        <Projectgrid product={products} />

        <div className="flex flex-col md:flex-row bg-violet-100 w-full rounded-lg mt-10">
          {/* Desktop Section */}
          <div className="hidden w-1/2 p-10 md:flex flex-col justify-center">
            <h1 className="font-bold mb-1">Comfort and Style</h1>
            <h1 className="text-4xl font-bold">Apparel made for your</h1>
            <h1 className="text-4xl font-bold mb-2">everyday life</h1>
            <p className="text-gray-700 mb-4">
              Discover high quality, comfortable clothing that effortlessly
              blends fashion and function. Designed to make you look and feel
              great every day.
            </p>
            <Link
              to="/collections/all"
              className="text-white bg-black py-2 w-25 px-4 text-sm rounded-lg"
            >
              Shop Now
            </Link>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src={featureImg}
              alt="feature-img"
              className="w-full object-cover h-auto rounded-t-lg md:rounded-t-none md:rounded-r-lg"
            />
          </div>

          {/* Mobile Section */}
          <div className="flex md:hidden w-full p-4 items-center flex-col justify-center">
            <h1 className="font-bold mb-1">Comfort and Style</h1>
            <h1 className="text-4xl font-bold tracking-tighter">
              Apparel made for your
            </h1>
            <h1 className="text-4xl font-bold mb-2 tracking-tighter">
              everyday life
            </h1>
            <p className="text-gray-700 mb-4">
              Discover high quality, comfortable clothing that effortlessly
              blends fashion and function. Designed to make you look and feel
              great every day.
            </p>
            <Link
              to="/collections/all"
              className="text-white bg-black py-2 w-25 px-4 text-sm rounded-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <Features />
    </div>
  );
};

export default Home;
