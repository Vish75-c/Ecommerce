import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import AdminSlideBar from './AdminSlideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isOpen,setisOpen]=useState(true);
    const toggleSlide=()=>{
        setisOpen(!isOpen);
    }
  return (
    <div className='flex flex-col md:flex-row'>
      {/* Small Screen Navigation */}
      <nav className='flex md:hidden bg-zinc-800 py-6 px-4 items-center'>
        <FaBars onClick={toggleSlide} className='text-white mr-6'size={20}/>
        <h1 className='text-white text-lg font-bold'>Admin DashBoard</h1>
      </nav>
      {/* overlay for small screen */}
        {isOpen&&<div className='md:hidden fixed top-19 inset-0 bg-black z-10 opacity-50 w-full'></div>} 
      <div className={`fixed z-50 inset-0 left-0 min-h-screen w-64 bg-zinc-800 ${isOpen?'translate-x-0':'-translate-x-full'} transition-transform duration-300 md:static md:translate-x-0`}>
        <AdminSlideBar setisOpen={setisOpen}/>
      </div>
      <div className='flex-grow'><Outlet/></div>
    </div>
  )
}

export default AdminLayout
