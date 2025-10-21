import React from "react";
import { FaBox, FaSignOutAlt,FaBoxOpen, FaClipboard, FaStore, FaUser, FaCross, FaXRay } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const AdminSlideBar = (props) => {
    const navigate=useNavigate();
    const handleLogout=()=>{
        navigate('/')
    }
  return (
    <div className="p-4 flex flex-col w-full">
      <div className="flex items-center justify-between w-full mb-5">
        <h1 className="text-2xl text-white  font-bold"><span className='text-2xl'>ꙮ</span>BuyHive</h1>
        <IoMdClose onClick={()=>props.setisOpen(false)} className="md:hidden " size={25}/>
      </div>
      <div className="flex p-3 flex-col text-white">
        <Link to="/admin"  className="text-white text-lg font-bold mb-8">
          Admin DashBoard
        </Link>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 px-4 py-2 mb-1 rounded-lg bg-zinc-700 text-emerald-400 font-semibold transition-colors"
              : "flex items-center gap-3 px-4 py-2 mb-1 rounded-lg text-gray-300 hover:bg-zinc-700 hover:text-emerald-300 transition-colors"
          }
        >
          <FaUser className="text-lg" />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 px-4 py-2 mb-3 rounded-lg bg-zinc-700 text-emerald-400 font-semibold transition-colors"
              : "flex items-center gap-3 px-4 py-2 mb-3 rounded-lg text-gray-300 hover:bg-zinc-700 hover:text-emerald-300 transition-colors"
          }
        >
          <FaBoxOpen className="text-lg" />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 px-4 py-2 mb-3 rounded-lg bg-zinc-700 text-emerald-400 font-semibold transition-colors"
              : "flex items-center gap-3 px-4 py-2 mb-3 rounded-lg text-gray-300 hover:bg-zinc-700 hover:text-emerald-300 transition-colors"
          }
        >
          <FaClipboard className="text-lg" />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 px-4 py-2 mb-3 rounded-lg bg-zinc-700 text-emerald-400 font-semibold transition-colors"
              : "flex items-center gap-3 px-4 py-2 mb-3 rounded-lg text-gray-300 hover:bg-zinc-700 hover:text-emerald-300 transition-colors"
          }
        >
          <FaStore className="text-lg" />
          <span>Shop</span>
        </NavLink>
        <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-zinc-700 hover:text-red-300 transition-colors"
      >
        <FaSignOutAlt className="text-lg" />
        <span>Logout</span>
      </button>
      </div>
    </div>
  );
};

export default AdminSlideBar;
