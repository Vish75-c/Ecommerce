import React from 'react'
const checkout={
    _id:"12334",
    createAt:new Date(),
    checkoutitems:[
        {
            productid:"1",
            name:"Jacket",
            color:"Black",
            size:"M",
            price:150,
            qty:1,
            image:"https://picsum.photos/150?random=1"
        },
                {
            productid:"1",
            name:"Jacket",
            color:"Black",
            size:"M",
            price:150,
            qty:1,
            image:"https://picsum.photos/150?random=2"
        }
    ],
    shippingAddress:{
        address:"123 Fashion Street",
        city:"New York",
        country:"USA"
    }
}
const OrderConfirmation = () => {
    const calculateestimatedate=(created)=>{
        const curr=new Date(created);
        curr.setDate(curr.getDate()+1);
        return curr.toLocaleDateString()
    }
  return (
    <div className='max-w-4xl mx-auto flex flex-col my-8 px-8'>
        <h1 className='text-emerald-800 text-4xl text-center my-4'>Thank You for Your Order!</h1>
        {checkout&&(<div className='w-full border border-gray-200 rounded-lg bg-gray-50 p-4'>
            <div className='flex justify-between mb-8'>
                <div className='flex flex-col'>
                    <span className='font-bold text-lg mb-1'>Order ID:{checkout._id}</span>
                     <span className='text-md text-xs font-bold text-gray-500'>Order date:{checkout.createAt.toLocaleDateString()}</span> 
                </div>
                <div className='text-xs font-bold text-gray-500' >Estimated Delivery :{calculateestimatedate(checkout.createAt)}</div>
            </div>
            <div className=' w-full flex flex-col mb-8'>
                {checkout.checkoutitems.map((item,index)=>{
                    return (<div className='flex justify-start mb-4 items-center'>
                        <div >
                            <img src={item.image} alt="order-img" className='w-15 h-15 object-cover rounded-lg mr-4'/>
                        </div>
                        <div className='flex flex-col w-full'> 
                            <div className='font-bold mb-1  text-md flex justify-between w-full'> <span>{item.name}</span>
                            <span >${item.price.toLocaleString()}</span>
                            </div>
                            <div className='text-gray-500 text-xs font-bold flex justify-between w-full'><span>{item.color} {" "}|{" "}{item.size}</span>
                            <span>Qty:{item.qty}</span>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col'>
                    <span className='mb-1 font-bold '>Payment</span><span className='text-gray-400 font-bold text-xs'>Paypal</span>
                </div>
                <div className='flex flex-col'>
                    <span className='mb-1 font-bold '>Delivery</span><span className='text-gray-400 font-bold text-xs'>{checkout.shippingAddress.address}</span>
                    <span className='text-gray-400 font-bold text-xs'>{checkout.shippingAddress.city}{","}{checkout.shippingAddress.country}</span>
                </div>
            </div>
        </div>)}
      
    </div>
  )
}

export default OrderConfirmation
