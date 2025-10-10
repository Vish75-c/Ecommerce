import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NewArrivals = () => {
    const scrollRef = useRef(null)
    const [canscrollleft, setCanscrollleft] = useState(false)
    const [canscrollright, setCanscrollright] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    const arrivals = [
        { _id: '1', name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket" }] },
        { _id: '2', name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Stylish Jacket" }] },
        { _id: '3', name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Stylish Jacket" }] },
        { _id: '4', name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Stylish Jacket" }] },
        { _id: '5', name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Stylish Jacket" }] },
        { _id: '6', name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=6", altText: "Stylish Jacket" }] },
        { _id: '7', name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=7", altText: "Stylish Jacket" }] },
        { _id: '8', name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=8", altText: "Stylish Jacket" }] },
    ]

    // Button scroll
    const updatescroll = (direction) => {
        const move = direction === 'left' ? -300 : 300
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: move, behavior: 'smooth' })
        }
    }

    const updatescrollbutton = () => {
        const container = scrollRef.current
        if (container) {
            setCanscrollleft(container.scrollLeft > 0)
            setCanscrollright(container.scrollLeft + container.clientWidth < container.scrollWidth)
        }
    }

    // Infinite scroll
    useEffect(() => {
        let animationFrameId
        const container = scrollRef.current
        const scroll = () => {
            if (container && isHovering) {
                container.scrollLeft += 1
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0
                }
            }
            animationFrameId = requestAnimationFrame(scroll)
        }
        animationFrameId = requestAnimationFrame(scroll)
        return () => cancelAnimationFrame(animationFrameId)
    }, [isHovering])

    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener('scroll', updatescrollbutton)
        }
        return () => {
            if (container) container.removeEventListener('scroll', updatescrollbutton)
        }
    }, [])

    // Decide which array to render
    const displayItems = isHovering ? [...arrivals, ...arrivals] : arrivals

    return (
        <section>
            <div className='container mx-auto text-center mb-10 relative px-4 '>
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p className='text-lg text-gray-600 mb-8 tracking-wide'>
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion
                </p>

                {/* Scroll buttons */}
                <div className='absolute right-20 bottom-[-30px] space-x-2'>
                    <button onClick={() => updatescroll('left')} className={`p-2 rounded border border-gray-200 text-black ${canscrollleft ? 'cursor-pointer bg-white' : 'cursor-not-allowed bg-gray-200'}`}>
                        <FiChevronLeft className='text-xl' />
                    </button>
                    <button onClick={() => updatescroll('right')} className={`p-2 rounded border border-gray-200 text-black ${canscrollright ? 'cursor-pointer bg-white' : 'cursor-not-allowed bg-gray-200'}`}>
                        <FiChevronRight className='text-xl' />
                    </button>
                </div>
            </div>

            {/* Scrollable content */}
            <div
                ref={scrollRef}
                className='container mx-auto overflow-x-hidden flex flex-row space-x-6 relative px-6'
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onTouchStart={() => setIsHovering(true)}
                onTouchEnd={() => setIsHovering(false)}
            >
                {displayItems.map((item, index) => (
                    <div key={index} className='min-w-[100%] md:min-w-[30%] relative flex-shrink-0'>
                        <img src={item.images[0].url} alt={item.images[0].altText} className='w-full h-[400px] object-cover rounded-lg' />
                        <div className='absolute bottom-0 left-0 right-0 rounded-b-lg p-3 bg-opacity-50 backdrop-blur-md text-white'>
                            <Link to={`/product/${item._id}`} className='block'>
                                <h1 className='font-medium'>{item.name}</h1>
                                <p>${item.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewArrivals
