import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

const Features = () => {
  return (
    <section className='px-6 pb-10 md:px-10 flex flex-col md:flex-row md:space-y-6 justify-evenly '>
        <div className='flex flex-col items-center'>
            <div className='p-2 mb-2'><HiShoppingBag/></div>
            <h1 className='tracking-tighter mb-1 text-sm'>FREE INTERNATIONAL SHOPPING</h1>
            <p className='tracking-tighter mb-1 text-gray-500 text-xs'>On all orders above $500.00</p>
        </div>
        <div className='flex flex-col items-center'>
            <div className='p-2 mb-2'><HiArrowPathRoundedSquare/></div>
            <h1 className='tracking-tighter mb-1 text-sm'>45 DAYS RETURN</h1>
            <p className='tracking-tighter mb-1 text-gray-500 text-xs'>Money back guarantee.</p>
        </div>
        <div className='flex flex-col items-center'>
            <div className='p-2 mb-2'><HiOutlineCreditCard/></div>
            <h1 className='tracking-tighter mb-1 text-sm'>SECURE CHECKOUT</h1>
            <p className='tracking-tighter mb-1 text-gray-500 text-xs'>On all orders above $500.00</p>
        </div>
       
    </section>
  )
}

export default Features
