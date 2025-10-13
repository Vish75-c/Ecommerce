import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import Cartcontent from '../Cart/Cartcontent';
import { useNavigate } from 'react-router-dom';
const CardDrawer = ({open,toggledrawer}) => {
  const navigate=useNavigate();
    const handlesubmit=()=>{
      console.log('click');
      navigate('/checkout')
    }
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-auto h-full z-50 bg-white shadow-lg transform-all transition-transform duration-300 flex flex-col ${open?'translate-x-0':'translate-x-full'}`}>
      <div className='flex justify-end p-4'>
        <IoMdClose onClick={()=>(toggledrawer())}className='h-6 w-6 text-gray-600 hover:text-black'/>
      </div>
      {/* card content with scrollable area */}
      <div className='flex flex-col overflow-y-auto p-4 flex-grow'>
        <h2 className="text-xl font-bold">Your Cart</h2>
        <Cartcontent/>
      </div>
      <div className='sticky bottom-0 p-4 flex  flex-col items-center'>
        <button onClick={handlesubmit} className='bg-zinc-700 text-white rounded-lg w-full py-2 hover:bg-zinc-600 transition'>Checkout</button>
        <p className='text-xs text-gray-700'>Shipping,taxes,and discount codes calculated at checkout</p>
      </div>
    </div>
  )
}

export default CardDrawer
