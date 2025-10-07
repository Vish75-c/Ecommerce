import React from "react";
import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram, IoMdCall } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbPhoneCall } from "react-icons/tb";
const Footer = () => {
  return (
    <>
      <div className=" container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-6 border-b border-gray-200 ">
        <div className="text-sm space-y-2">
          <h1 className="font-bold mb-4">Newsletter</h1>
          <p className="text-gray-700 hover:text-black font-medium text-sm">
            Be the first to hear about new product,exclusive event,and online
            offers
          </p>
          <p className="text-gray-700 hover:text-black font-bold">
            Sign up and get 10% off your first order
          </p>
          <form className="flex mt-6">
            <input
              type="text"
              placeholder="Enter your email"
              required
              className="border-b border-t border-l rounded-lg rounded-r-none border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all "
            />
            <button
              type="submit"
              className="bg-black text-white rounded-lg rounded-l-none py-2 px-3 hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="flex flex-col space-y-2 text-sm">
          <h1 className="font-bold mb-4">Shop</h1>
          <Link
            to="#"
            className="text-gray-700 hover:text-black font-medium text-sm"
          >
            Men's Top Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black font-medium  text-sm"
          >
            Women's Top Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black font-medium  text-sm"
          >
            Men's Bottom Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black font-medium  text-sm"
          >
            Women's Bottom Wear
          </Link>
        </div>
        <div className="flex flex-col space-y-2 text-sm">
          <h1 className="font-bold mb-4">Support</h1>
          <Link
            to="/Contact"
            className="text-gray-700 hover:text-black font-medium  text-sm"
          >
            Contact Us
          </Link>
          <Link
            to="/Aboutus"
            className="text-gray-700 hover:text-black font-medium  text-sm"
          >
            About Us
          </Link>
          <Link
            to="/FAQs"
            className="text-gray-700 hover:text-black font-medium  text-sm"
          >
            FAQs
          </Link>
          <Link
            to="/Features"
            className="text-gray-700 hover:text-black font-medium  text-sm"
          >
            Features
          </Link>
        </div>
        <div className="flex flex-col space-y-2 text-sm">
          <h1 className="font-bold mb-4">Follow Us</h1>
          <div className="hidden md:flex items-center space-x-2">
            <a href="#" className="hover:text-gray-300">
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <RiTwitterXLine className="h-4 w-4" />
            </a>
          </div>
          <h1 className="text-gray-700 hover:text-black font-medium  text-sm">Call us</h1>
          <div className="flex space-x-2"><IoMdCall className="h-5 w-5"/>
          <Link href="tel:+12442" className='hover:text-gray-300'>
                    +91-981023281
                </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-6 flex justify-center items-center">
        <p className="text-xs text-gray-700 hover:text-black">© 2025 | All Rights Reserved</p>
      </div>
      
    </>
  );
};

export default Footer;
