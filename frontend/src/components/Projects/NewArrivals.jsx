import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
const NewArrivals = () => {
    const arrivals=[
        {
            _id:'1',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=1",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:'2',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=2",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:'3',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=3",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:'4',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=4",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:'5',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=5",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:'6',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=6",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:'7',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=7",
                    altText:"Stylish Jacket"
                }
            ]
        },
        {
            _id:'8',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=8",
                    altText:"Stylish Jacket"
                }
            ]
        },

    ]
  return (
    <section>
        <div className='container mx-auto text-center mb-10 relative px-4 '>
            <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
            <p className='text-lg text-gray-600 mb-8 tracking-wide'>
                Discover the lastest styles straight off the runway,freshly added to keep your wardrobe on the cutting edge of fashion
            </p>
            {/* Scoll button */}
            <div className='absolute right-20 bottom-[-30px] space-x-2'>
                <button className='p-2 rounded bg-white border border-gray-200 text-black'>
                    <FiChevronLeft className='text-xl'/>
                    
                </button>
                <button className='p-2 rounded bg-white border border-gray-200 text-black'>
                    <FiChevronRight className='text-xl'/>
                </button>
            </div>
            
        </div>
        {/* Scrollable content */}
            <div className='container mx-auto overflow-x-scroll  flex flex-row  space-x-6 relative px-6'>
                {
                    arrivals.map((item,index)=>{
                        return (
                            <div key={index} className=' min-w-[100%]   md:min-w-[30%] relative'>
                                <img src={item.images[0].url} alt={item.images[0].altText} className='w-full h-[400px] object-cover rounded-lg' />
                                <div className='absolute bottom-0 left-0 right-0  rounded-b-lg  p-3 bg-opacity-50 backdrop-blur-md text-white'>
                                    <Link to={`/product/${item._id} `} className='block '>
                                    <h1 className='font-medium'>{item.name}</h1>
                                    <p >${item.price}</p>
                                    </Link>
                                </div>
                            </div>
                        )  
                    })
                }
            </div>
    </section>
  )
}

export default NewArrivals
