import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const FilterSlideBar = () => {
  const [searchparams, setsearchparams] = useSearchParams();
  const navigate = useNavigate();
  const [priceRange, setpriceRange] = useState([0, 100]);
  const [filter, setfilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  
  const category = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const material = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const gender = ["Men", "Women"];
  useEffect(() => {
    const params = Object.fromEntries([...searchparams]);
    setfilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
   
    setpriceRange([0,100]);
  }, [searchparams]);

  const handlefilterchange = (e) => {
    const { name, value, checked, type } = e.target;
    // console.log({name,value,checked,type});
    const newFilter = { ...filter };
    if (type === "checkbox") {
      if (checked == true) {
        newFilter[name] = [...newFilter[name], value];
      } else {
        newFilter[name] = newFilter[name].filter((item) => item != value);
      }
    } else {
      newFilter[name] = value;
    }

    handleURlChange(newFilter);
    setfilter(newFilter);
    
  };
  const handlepricechange=(e)=>{
    const newFilter={...filter,minPrice:0,maxPrice:e.target.value}
    setfilter(newFilter);
    handleURlChange(newFilter);
  }
  const handleURlChange = (newFilter) => {
    const params = new URLSearchParams();
    Object.keys(newFilter).forEach((key) => {
      if (Array.isArray(newFilter[key]) && newFilter.length > 0) {
        params.append(key, newFilter[key].join(","));
      } else if (newFilter[key]) {
        params.append(key, newFilter[key]);
      }
    });
    setsearchparams(params);
   // navigate(`?${params.toString()}`);
  };
  return (
    <div className="flex flex-col p-4">
      <h3 className="text-xl font-bold text-center mb-4">Filter</h3>
      {/* Category */}
      <div className="flex flex-col mb-6">
        <label className="block font-medium text-md mb-2 text-gray-700">
          Category:
        </label>
        {category.map((category) => {
          return (
            <div key={category} className="flex items-center mb-1">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filter.category===category}
                onChange={(e) => handlefilterchange(e)}
                className="text-blue-500 focus:ring-blue-5400 border-gray-300 mr-2 h-4 w-4"
              />
              <span className="text-gray-700">{category}</span>
            </div>
          );
        })}
      </div>
      {/* Gender Filter */}
      <div className="flex flex-col mb-6">
        <label className="block font-medium text-md mb-2 text-gray-700">
          Gender:
        </label>
        {gender.map((gender) => {
          return (
            <div key={gender} className="flex items-center mb-1">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={filter.gender===gender}
                onChange={(e) => handlefilterchange(e)}
                className="text-blue-500 focus:ring-blue-5400 border-gray-300 mr-2 h-4 w-4"
              />
              <span className="text-gray-700">{gender}</span>
            </div>
          );
        })}
      </div>
      {/* Color Filter */}
      <div className="flex flex-col mb-6">
        <label className="block font-medium text-md mb-2 text-gray-700">
          Color:
        </label>
        <div className="flex flex-row gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              checked={filter.color===color}
              onClick={(e) => handlefilterchange(e)}
              className={`w-7 h-7 rounded-full mt-1 cursor-pointer hover:scale-105
          ${
            filter.color === color
              ? "border-4 border-gray-700"
              : "border border-gray-300"
          }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>
      {/* Size Filter */}
      <div className="flex flex-col mb-6">
        <label className="block font-medium text-md mb-2 text-gray-700">
          Size:
        </label>
        {sizes.map((size) => {
          return (
            <div key={size} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="size"
                value={size}
                checked={filter.size.includes(size)}
                onChange={(e) => handlefilterchange(e)}
                className="text-blue-500 focus:ring-blue-5400 border-gray-300 mr-2 h-4 w-4"
              />
              <span className="text-gray-700">{size}</span>
            </div>
          );
        })}
      </div>
      {/* Material Filter */}
      <div className="flex flex-col mb-6">
        <label className="block font-medium text-md mb-2 text-gray-700">
          Material:
        </label>
        {material.map((material) => {
          return (
            <div key={material} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="material"
                value={material}
                checked={filter.material.includes(material)}
                onChange={(e) => handlefilterchange(e)}
                className="text-blue-500 focus:ring-blue-5400 border-gray-300 mr-2 h-4 w-4"
              />
              <span className="text-gray-700">{material}</span>
            </div>
          );
        })}
      </div>
      {/* brand Filter */}
      <div className="flex flex-col mb-6">
        <label className="block font-medium text-md mb-2 text-gray-700">
          Brand:
        </label>
        {brands.map((brand) => {
          return (
            <div key={brand} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="brand"
                onChange={(e) => handlefilterchange(e)}
                value={brand}
                checked={filter.brand.includes(brand)}
                className="text-blue-500 focus:ring-blue-5400 border-gray-300 mr-2 h-4 w-4"
              />
              <span className="text-gray-700">{brand}</span>
            </div>
          );
        })}
      </div>
      {/*  Price Range Filter*/}
      <div className="flex flex-col mb-8">
        <label className="block font-medium text-md mb-2 text-gray-700">
          Price Range:
        </label>
        <input
          type="range"
          min={0}
          name="Price"
          
          onChange={(e)=>handlepricechange(e)}
          max={priceRange[1]}
          className="cursor-pointer"
        />
        <div className="flex flex-row justify-between text-xs text-gray-700">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSlideBar;
