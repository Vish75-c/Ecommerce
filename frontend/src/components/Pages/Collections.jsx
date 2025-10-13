import React, { useEffect, useRef } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import FilterSlideBar from "../Layout/FilterSlideBar";
import SortOptions from "../Layout/SortOptions";
import Projectgrid from "../Layout/Projectgrid";
const Collections = () => {
  const [product, setproduct] = useState([]);
  const slideref = useRef("");
  const [slide, setslide] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const arr = [
    {
      id: 1,
      name: "Product 1",
      image: {
        url: "https://picsum.photos/500/500?random=15",
        AltText: "Product",
      },
      price: "190",
    },
    {
      id: 2,
      name: "Product 2",
      image: {
        url: "https://picsum.photos/500/500?random=16",
        AltText: "Product",
      },
      price: "200",
    },
    {
      id: 2,
      name: "Product 3",
      image: {
        url: "https://picsum.photos/500/500?random=17",
        AltText: "Product",
      },
      price: "600",
    },
    {
      id: 2,
      name: "Product 4",
      image: {
        url: "https://picsum.photos/500/500?random=18",
        AltText: "Product",
      },
      price: "930",
    },
    {
      id: 1,
      name: "Product 5",
      image: {
        url: "https://picsum.photos/500/500?random=19",
        AltText: "Product",
      },
      price: "1190",
    },
    {
      id: 2,
      name: "Product 6",
      image: {
        url: "https://picsum.photos/500/500?random=20",
        AltText: "Product",
      },
      price: "2020",
    },
    {
      id: 2,
      name: "Product 7",
      image: {
        url: "https://picsum.photos/500/500?random=21",
        AltText: "Product",
      },
      price: "6030",
    },
    {
      id: 2,
      name: "Product 8",
      image: {
        url: "https://picsum.photos/500/500?random=22",
        AltText: "Product",
      },
      price: "1930",
    },
  ];
      
      setproduct(arr);
      
    }, 1000);
    
  }, []);
  const toggleslide = () => {
    console.log(product);
    setslide(!slide);
  };
  const handlemousedown = () => {
    if (slideref.current && slideref.current.contains(e.target)) {
      setslide(!slide);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handlemousedown);
    // remove event listener
    return (()=>
      (document.removeEventListener("mousedown", handlemousedown))
    )
    
  },[]);
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row space-y-6 md:space-x-6 ">
        {/* Mobile Slide Function */}
        <button
          onClick={() => toggleslide()}
          className=" lg:hidden p-2 border border-gray-200 flex items-center justify-center "
        >
          <FaFilter />
        </button>
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
            <h1 className="text-3xl font bold">
                All Collections
            </h1>
            {/* Sort Option */}
            <SortOptions/>
            {/* Product Grid */}
            <Projectgrid product={product}/>
            
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default Collections;
