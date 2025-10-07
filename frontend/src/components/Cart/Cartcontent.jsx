import React from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi2'
import { RiDeleteBackFill, RiDeleteBin5Fill } from 'react-icons/ri'

const Cartcontent = () => {
    const product=[
        {
            productid:1,
            name:"T-shirt",
            size:'M',
            color:"Red",
            quantity:1,
            price:15,
            image:"https://picsum.photos/200?random=1"
        },
        {
            productid:2,
            name:"Jeans",
            size:'L',
            color:"Blue",
            quantity:1,
            price:25,
            image:"https://picsum.photos/200?random=2"
        }

    ]
  return (
    <div>
      {
        product.map((item,index)=>{
            return (
                <div key={index} className='relative w-full flex ju py-2 mt-6 border-b border-gray-200'>
                    <div>
                        <img src={item.image} alt="image" className='h-20 w-16 rounded-md ' />
                    </div>
                    <div className='ml-2 text-gray-700'>
                        <h1 className='font-bold mb-2'>{item.name}</h1>
                        <p className='text-gray-700 text-xs mb-2'>size:{item.size} | color:{item.color}</p>
                        <div className='flex space-x-2 mb-2 '>
                        <div className='border p-1 border-gray-200 flex justify-between items-center'><HiMinus/></div>
                        
                        <span>{item.quantity}</span>
                        <div className='border p-1 border-gray-200 flex justify-between items-center'><HiPlus/></div>
                        </div>
                        
                    </div>
                    <div className='absolute right-2'>
                    <h1 className='font-bold mb-2'>{item.price}</h1>
                         <div><RiDeleteBin5Fill className='text-red-500 text-xl'/></div>
                    </div>
                    
                </div>
            )
        })
      }
    </div>
  )
}

export default Cartcontent
