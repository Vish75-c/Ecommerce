import React from 'react'
import Hero from '../Layout/Hero'
import GenderCollection from '../Projects/GenderCollection'
import NewArrivals from '../Projects/NewArrivals'
import Product from '../Common/Product'
import {ToastContainer} from 'react-toastify';
import Projectgrid from '../Layout/Projectgrid'
import featureImg from '../../assets/featured.webp'
import { Link } from 'react-router-dom'
const Home = () => {
    const womengrid=[
    {id:1,name:"Product 1",image:{url:"https://picsum.photos/500/500?random=15",AltText:"Product"},price:"190"},
    {id:2,name:"Product 2",image:{url:"https://picsum.photos/500/500?random=16",AltText:"Product"},price:"200"},
    {id:2,name:"Product 3",image:{url:"https://picsum.photos/500/500?random=17",AltText:"Product"},price:"600"},
    {id:2,name:"Product 4",image:{url:"https://picsum.photos/500/500?random=18",AltText:"Product"},price:"930"},
    {id:1,name:"Product 5",image:{url:"https://picsum.photos/500/500?random=19",AltText:"Product"},price:"1190"},
    {id:2,name:"Product 6",image:{url:"https://picsum.photos/500/500?random=20",AltText:"Product"},price:"2020"},
    {id:2,name:"Product 7",image:{url:"https://picsum.photos/500/500?random=21",AltText:"Product"},price:"6030"},
    {id:2,name:"Product 8",image:{url:"https://picsum.photos/500/500?random=22",AltText:"Product"},price:"1930"},
  ]
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
      <div className='container mx-auto p-6 md:p-20'>
        <h2 className='text-3xl font-bold text-center mb-6'>Top Wear for Women's</h2>
        <Projectgrid product={womengrid}/>
        <div className='flex flex-col md:flex-row bg-violet-100 w-full rounded-lg mt-10'>
          <div className='hidden w-1/2 p-10 md:flex flex-col justify-center'>  
             <h1 className='font-bold mb-1'>Comfort and Style</h1>
             <h1 className='text-4xl font-bold'>Apparel made for your</h1>
             <h1 className='text-4xl font-bold mb-2'>everyday life</h1>
             <p className='text-gray-700 mb-4'>Discover high quality,confortable clothing that effortlessly blends fashion and function.Designed to make you look and feel great every day.</p>
             <Link to='/collections/all' className='text-white bg-black py-2 w-25 px-4 text-sm rounded-lg'>Shop Now</Link>
          </div>
          <div className='w-full md:w-1/2'><img src={featureImg} alt="feature-img" className='w-full object-cover h-auto rounded-t-lg md:rounded-t-none md:rounded-r-lg'/></div>
        {/* Mobile Navigation */}
                
          <div className='flex md:hidden w-full p-4 items-center flex-col justify-center'>  
             <h1 className='font-bold mb-1'>Comfort and Style</h1>
             <h1 className='text-4xl font-bold tracking-tighter'>Apparel made for your</h1>
             <h1 className='text-4xl font-bold mb-2 tracking-tighter'>everyday life</h1>
             <p className='text-gray-700 mb-4'>Discover high quality,confortable clothing that effortlessly blends fashion and function.Designed to make you look and feel great every day.</p>
             <Link to='/collections/all' className='text-white bg-black py-2 w-25 px-4 text-sm rounded-lg'>Shop Now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
