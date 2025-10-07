import React from 'react'
import menImg from '../../assets/mens-collection.webp'
import womenImg from '../../assets/womens-collection.webp'
import { Link } from 'react-router-dom'
const GenderCollection = () => {
  return (
    <section className='py-16 px-16 w-full'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2  gap-8'>
            <div className='relative flex-1'>
                <img src={womenImg} alt="women-img" className='w-full h-[700px] object-cover rounded-md' />
                <div className='absolute bottom-8 left-8 rounded-md bg-white bg-opacity-80 p-4'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-3'>Women's Collection</h1>
                    <Link to='/collections/all?gender=Women' className="text-gray-900 underline">Shop Now</Link>
                </div>
            </div>
            <div className='relative flex-1'>
                <img src={menImg} alt="men-img" className='w-full h-[700px] object-cover rounded-md' />
                <div className='absolute bottom-8 left-8 rounded-md bg-white bg-opacity-80 p-4'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-3'>Men's Collection</h1>
                    <Link to='/collections/all?gender=Men' className="text-gray-900 underline">Shop Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollection
