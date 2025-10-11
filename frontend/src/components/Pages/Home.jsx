import React from 'react'
import Hero from '../Layout/Hero'
import GenderCollection from '../Projects/GenderCollection'
import NewArrivals from '../Projects/NewArrivals'
import Product from '../Common/Product'
import {ToastContainer} from 'react-toastify';
const Home = () => {
  
  return (
    
    <div>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
<div class="fixed top-0 -z-10 h-full w-full bg-white"><div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div>
      <Hero/>
      <GenderCollection/>
      <NewArrivals/>
      <h1 className='text-3xl font-bold text-black text-center mt-10 '>Best Seller</h1>
      <Product/>
    </div>
  )
}

export default Home
