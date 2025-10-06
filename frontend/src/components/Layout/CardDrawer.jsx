import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';

const CardDrawer = ({open,toggledrawer}) => {
    
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white shadow-lg transform-all transition-transform duration-300 flex flex-col ${open?'translate-x-0':'translate-x-full'}`}>
      <div className='flex justify-end p-4'>
        <IoMdClose onClick={()=>(toggledrawer())}className='h-6 w-6 text-gray-600 hover:text-black'/>
      </div>
    </div>
  )
}

export default CardDrawer
