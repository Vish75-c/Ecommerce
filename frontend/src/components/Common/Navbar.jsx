import React from 'react'
import {useState} from "react";
import { Link } from 'react-router-dom'
import { HiOutlineUser,HiOutlineShoppingBag,HiSearchCircle ,} from 'react-icons/hi'
import { RiSideBarLine } from 'react-icons/ri'
import { HiBars2 } from 'react-icons/hi2'
import Searchbar from './Searchbar'
import CardDrawer from '../Layout/CardDrawer'
const Navbar = () => {
  const [open,setopen]=useState(false);
    const toggledrawer=()=>{
        setopen(!open);
    }
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div>
            <Link to='/' className='text-xl font-bold text-gray-700 hover:text-black'>iShop</Link>
        </div>
        <div className='hidden md:flex space-x-6'>
            <Link to='#' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Men</Link>
            <Link to='#' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Women</Link>
            <Link to='#' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Top Wear</Link>
            <Link to='#' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Buttom Wear</Link>
        </div>
        {/* right icons */}
        <div className="flex items-center space-x-4">
            <Link to='/profile' className='hover:text-black '><HiOutlineUser className='h-6 w-6 text-gray-700'/></Link>
            <button className='relative hover:text-black text-gray-700' onClick={()=>(setopen(true))}>
                <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
                <span className='absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-.5'>4</span>
            </button>
             {/* search */}
             <Searchbar/>
        <button className='flex md:hidden'> <RiSideBarLine className='h-6 w-6 hover:text-black text-gray-700'/></button>
        </div>
       
      </nav>
      <CardDrawer open={open} toggledrawer={toggledrawer} />
    </>
  )
}

export default Navbar
