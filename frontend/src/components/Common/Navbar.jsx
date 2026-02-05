import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { RiSideBarLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import Searchbar from "./Searchbar";
import CardDrawer from "../Layout/CardDrawer";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => setOpen(!open);
  const toggleMenu = () => setMenu(!menu);

  return (
    <>
      <motion.nav 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all  duration-300 ${
          scrolled
            ? "bg-white shadow-md text-gray-800"
            : "bg-[#ea2e0e] text-white"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6 max-w-[1200px]">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold flex items-center ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <span className="text-3xl mr-1">ꙮ</span>BuyHive
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["Men", "Women", "Top Wear", "Bottom Wear"].map((label, i) => {
              const link =
                label === "Men" || label === "Women"
                  ? `/collections/all?gender=${label}`
                  : `/collections/all?category=${label}`;
              return (
                <Link
                  key={i}
                  to={link}
                  className="relative font-medium uppercase text-sm group"
                >
                  {label}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className={`text-sm py-1 px-3 rounded-md ${
                  scrolled
                    ? "bg-[#ea2e0e] text-white"
                    : "bg-white text-[#ea2e0e]"
                }`}
              >
                Admin
              </Link>
            )}

            <Link to="/profile" className="hover:opacity-80">
              <HiOutlineUser className="h-6 w-6" />
            </Link>

            <button
              className="relative hover:opacity-80"
              onClick={toggleDrawer}
            >
              <HiOutlineShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-[#ea2e0e] text-xs font-bold rounded-full px-1.5 py-0.5">
                  {cartItemCount}
                </span>
              )}
            </button>

            <Searchbar />

            <button onClick={toggleMenu} className="md:hidden flex">
              <RiSideBarLine className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      <CardDrawer open={open} toggledrawer={toggleDrawer} />

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: menu ? 0 : "-100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed md:hidden top-0 left-0 w-3/4 bg-white h-full z-50 shadow-lg"
      >
        <div className="flex justify-end p-4">
          <IoMdClose
            onClick={toggleMenu}
            className="h-6 w-6 text-gray-600 hover:text-black cursor-pointer"
          />
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <h1 className="text-[#ea2e0e] text-2xl font-bold mb-3">Menu</h1>
          <Link
            to="/collections/all?gender=Men"
            onClick={toggleMenu}
            className="text-gray-700 hover:text-[#ea2e0e] font-medium uppercase text-sm"
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            onClick={toggleMenu}
            className="text-gray-700 hover:text-[#ea2e0e] font-medium uppercase text-sm"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            onClick={toggleMenu}
            className="text-gray-700 hover:text-[#ea2e0e] font-medium uppercase text-sm"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            onClick={toggleMenu}
            className="text-gray-700 hover:text-[#ea2e0e] font-medium uppercase text-sm"
          >
            Bottom Wear
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
