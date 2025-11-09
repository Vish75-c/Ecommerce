import React, { useEffect, useRef, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { FaFilter } from "react-icons/fa";
import FilterSlideBar from "../Layout/FilterSlideBar";
import SortOptions from "../Layout/SortOptions";
import Projectgrid from "../Layout/Projectgrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../../redux/slices/productsSlice";

const Collections = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const slideref = useRef(null);
  const [slide, setslide] = useState(false);

  // 🔥 Fetch products whenever filters or collection change
  useEffect(() => {
    const parsedParams = Object.fromEntries([...searchParams]);
    const processedParams = {
      ...parsedParams,
      size: parsedParams.size ? parsedParams.size.split(",") : [],
      material: parsedParams.material ? parsedParams.material.split(",") : [],
      brand: parsedParams.brand ? parsedParams.brand.split(",") : [],
      color: parsedParams.color || "",
      gender: parsedParams.gender || "",
      category: parsedParams.category || "",
      minPrice: parsedParams.minPrice || 0,
      maxPrice: parsedParams.maxPrice || 100,
    };
    dispatch(fetchProductsByFilters({ collection, ...processedParams }));
  }, [dispatch, searchParams, collection]);


  const toggleslide = () => {
    setslide(!slide);
  };

  const handlemousedown = (e) => {
    if (slideref.current && !slideref.current.contains(e.target)) {
      setslide(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handlemousedown);
    return () => {
      document.removeEventListener("mousedown", handlemousedown);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row space-y-6 md:space-x-6">
        {/* Mobile Slide Function */}
        <button
          onClick={toggleslide}
          className="lg:hidden p-2 border border-gray-200 flex items-center justify-center"
        >
          <FaFilter />
        </button>

        {/* Sidebar */}
        <div
          ref={slideref}
          className={`${
            slide ? "translate-x-0" : "-translate-x-full"
          } fixed left-0 w-64 bg-white inset-0 z-50 min-h-full overflow-y-scroll lg:overflow-y-hidden transition-transform duration-300 lg:static lg:translate-x-0`}
        >
          <FilterSlideBar />
        </div>

        {/* Main Collection grid */}
        <div className="flex-grow p-4">
          <h1 className="text-3xl font-bold mb-4">All Collections</h1>
          <SortOptions />
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Projectgrid product={products} />
          )}
        </div>
      </div>
    </>
  );
};

export default Collections;
