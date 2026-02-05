import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxCheckout = useSelector((state) => state.checkout.checkout);
  const [checkout, setCheckout] = useState(reduxCheckout || null);

  useEffect(() => {
    // ✅ Load from Redux first or from localStorage if reloaded
    if (reduxCheckout) {
      setCheckout(reduxCheckout);
      localStorage.setItem('latestCheckout', JSON.stringify(reduxCheckout));
    } else {
      const stored = localStorage.getItem('latestCheckout');
      if (stored) {
        setCheckout(JSON.parse(stored));
      } else {
        navigate('/my-order');
      }
    }
  }, [reduxCheckout, navigate]);

  const calculateEstimatedDate = (created) => {
    const curr = new Date(created);
    curr.setDate(curr.getDate() + 1);
    return curr.toLocaleDateString();
  };

  if (!checkout) return null;

  return (
    <div className='max-w-4xl mx-auto flex flex-col my-8 px-8'>
      <h1 className='text-emerald-800 text-4xl text-center my-4'>
        Thank You for Your Order!
      </h1>
      <div className='w-full border border-gray-200 rounded-lg bg-gray-50 p-4'>
        <div className='flex justify-between mb-8'>
          <div className='flex flex-col'>
            <span className='font-bold text-lg mb-1'>
              Order ID: {checkout._id}
            </span>
            <span className='text-xs font-bold text-gray-500'>
              Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className='text-xs font-bold text-gray-500'>
            Estimated Delivery: {calculateEstimatedDate(checkout.createdAt)}
          </div>
        </div>

        <div className='w-full flex flex-col mb-8'>
          {checkout.checkoutItem?.map((item, index) => (
            <div key={index} className='flex justify-start mb-4 items-center'>
              <img
                src={item.image}
                alt='order-img'
                className='w-15 h-15 object-cover rounded-lg mr-4'
              />
              <div className='flex flex-col w-full'>
                <div className='font-bold mb-1 text-md flex justify-between w-full'>
                  <span>{item.name}</span>
                  <span>${item.price.toLocaleString()}</span>
                </div>
                <div className='text-gray-500 text-xs font-bold flex justify-between w-full'>
                  <span>
                    {item.color} | {item.size}
                  </span>
                  <span>Qty: {item.qty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col'>
            <span className='mb-1 font-bold'>Payment</span>
            <span className='text-gray-400 font-bold text-xs'>
              {checkout.paymentMethod}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='mb-1 font-bold'>Delivery</span>
            <span className='text-gray-400 font-bold text-xs'>
              {checkout.shippingAddress.address}
            </span>
            <span className='text-gray-400 font-bold text-xs'>
              {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
