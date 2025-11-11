import React from 'react'
import {useState} from "react";
import { Link } from 'react-router-dom'
import { HiOutlineUser,HiOutlineShoppingBag,HiSearchCircle ,} from 'react-icons/hi'
import { RiSideBarLine } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io';
import { HiBars2, HiMiniXMark } from 'react-icons/hi2'
import Searchbar from './Searchbar'
import CardDrawer from '../Layout/CardDrawer'
import { useSelector } from 'react-redux';
const Navbar = () => {
  const [open,setopen]=useState(false);
    const toggledrawer=()=>{
        setopen(!open);
    }
    const [menu,setmenu]=useState(false);
    const togglemenu=()=>{
      setmenu(!menu);
    }
    const {cart}=useSelector((state)=>state.cart);
    const cartItemCount=cart?.products?.reduce((total,product)=>total+product.quantity,0)||0;
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div>
            <Link to='/' className='text-xl font-bold text-gray-700 hover:text-black'><span className='text-2xl'>ꙮ</span>BuyHive</Link>
        </div>
        <div className='hidden md:flex space-x-6'>
            <Link to='/collections/all?gender=Men' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Men</Link>
            <Link to='/collections/all?gender=Women' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Women</Link>
            <Link to='/collections/all?category=Top Wear' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Top Wear</Link>
            <Link to='/collections/all?category=Bottom Wear' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Bottom Wear</Link>
        </div>
        {/* right icons */}
        <div className="flex items-center space-x-4">
          <Link to='/admin' className='text-white text-sm py-1 opacity-80 rounded-md px-3 bg-black'>Admin</Link>
            <Link to='/profile' className='hover:text-black '><HiOutlineUser className='h-6 w-6 text-gray-700'/></Link>
            <button className='relative hover:text-black text-gray-700' onClick={()=>(setopen(true))}>
                <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
                {cartItemCount>0&&(<span className='absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-.5'>{cartItemCount}</span>)}
            </button>
             {/* search */}
             <Searchbar/>
        <button className='flex' onClick={()=>(togglemenu())}> <RiSideBarLine className='h-6 md:hidden w-6 hover:text-black text-gray-700'/></button>
        </div>
       
      </nav>
      <CardDrawer open={open} toggledrawer={toggledrawer} />
      {/* mobile navigation */}
      <div className={`flex flex-col md:hidden fixed w-3/4 left-0 shadow-lg top-0 h-full z-50 transform-all duration-300 bg-white ${menu?'translate-x-0':'-translate-x-full'}`}>
      <div className='flex justify-end p-4'>
              <IoMdClose onClick={()=>(togglemenu())}className='h-6 w-6 text-gray-600 hover:text-black'/>
        </div>
        <div className='flex flex-col p-4 space-y-3'>
          <h1 className='text-black text-xl font-bold'>Menu</h1>
                      <Link to='/collections/all?gender=Men' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Men</Link>
            <Link to='/collections/all?gender=Women' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Women</Link>
            <Link to='/collections/all?category=Top Wear' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Top Wear</Link>
            <Link to='/collections/all?category=Bottom Wear' className='text-gray-700 hover:text-black font-medium uppercase text-sm'>Buttom Wear</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
