import React, { use, useEffect } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi2'
import { RiDeleteBackFill, RiDeleteBin5Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';

const Cartcontent = ({cart,userId,guestId}) => {
   const dispatch=useDispatch();
  //  Handling adding or substracting the cart value
  const handleAddToCart=(productId,delta,quantity,size,color)=>{
    const newQuantity=quantity+delta;
    if(newQuantity>=1){
      dispatch(updateCartItemQuantity({
        productId,
        quantity:newQuantity,
        guestId,
        userId,
        size,
        color
      }))
    }
  }
  const handleRemoveFromCart=(productId,size,color)=>{
    dispatch(removeFromCart({productId,guestId,userId,size,color}))
  }
  return (
    <div>
      {
        cart.products.map((item,index)=>{
            return (
                <div key={index} className='relative w-full flex ju py-2 mt-6 border-b border-gray-200'>
                    <div>
                        <img src={item.image} alt="image" className='h-20 w-16 rounded-md ' />
                    </div>
                    <div className='ml-2 text-gray-700'>
                        <h1 className='font-bold mb-2'>{item.name}</h1>
                        <p className='text-gray-700 text-xs mb-2'>size:{item.size} | color:{item.color}</p>
                        <div className='flex space-x-2 mb-2 '>
                        <div onClick={()=>handleAddToCart(item.productId,-1,item.quantity,item.size,item.color)} className='border p-1 border-gray-200 flex justify-between items-center'><HiMinus/></div>
                        
                        <span>{item.quantity}</span>
                        <div onClick={()=>handleAddToCart(item.productId,1,item.quantity,item.size,item.color)} className='border p-1 border-gray-200 flex justify-between items-center'><HiPlus/></div>
                        </div>
                        
                    </div>
                    <div className='absolute right-2'>
                    <h1 className='font-bold mb-2'>{item.price}</h1>
                         <div onClick={()=>handleRemoveFromCart(item.productId,item.size,item.color,guestId,userId)}><RiDeleteBin5Fill className='text-red-500 text-xl'/></div>
                    </div>
                    
                </div>
            )
        })
      }
    </div>
  )
}

export default Cartcontent
