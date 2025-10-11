import React from 'react'
import { Link } from 'react-router-dom'
const Projectgrid = ({product}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 space-x-6'>
        {
            product.map((item,index)=>{
                return (<Link to={`/product/${item.id}`}><div key={index} className='flex flex-col w-full'>
                    <img src={item.image.url} alt={item.image.AltText} className='w-full h-[400px] object-cover rounded-lg mb-2'/>
                    <span className='font-bold  tracking-tighter'>{item.name}</span>
                    <span className='text-gray-500 mb-2 '>${item.price}</span>
                </div></Link>)
            })
        }
    </div>
  )
}

export default Projectgrid
