import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="w-full bg-[#ea2e0e] text-white text-sm">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-2 px-4">
        {/* Left: Social icons */}
        <div className="hidden md:flex items-center space-x-3">
          <a href="#" className="hover:text-gray-200">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-200">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-200">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>

        {/* Center: Quote */}
        <div className="flex-1 text-center font-medium tracking-wide">
          <span>🔥 “Style is a way to say who you are without speaking.”</span>
        </div>

        {/* Right: Contact / Login */}
        <div className="hidden md:flex items-center space-x-3">
          <a href="tel:+91981023281" className="hover:text-gray-200">
            +91-981023281
          </a>
          <span className="opacity-60">|</span>
          <a href="/profile" className="hover:text-gray-200">
            Login / Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
