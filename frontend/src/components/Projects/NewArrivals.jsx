import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canscrollleft, setCanscrollleft] = useState(false);
  const [canscrollright, setCanscrollright] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/new-arrivals`
        );
        setArrivals(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewArrivals();
  }, []);

  // Scroll control
  const updatescroll = (direction) => {
    const move = direction === "left" ? -300 : 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: move, behavior: "smooth" });
    }
  };

  const updatescrollbutton = () => {
    const container = scrollRef.current;
    if (container) {
      setCanscrollleft(container.scrollLeft > 0);
      setCanscrollright(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  };

  // Infinite hover scroll
  useEffect(() => {
    let animationFrameId;
    const container = scrollRef.current;
    const scroll = () => {
      if (container && isHovering) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) container.addEventListener("scroll", updatescrollbutton);
    return () => {
      if (container)
        container.removeEventListener("scroll", updatescrollbutton);
    };
  }, []);

  // duplicated list for smooth loop
  const displayItems = isHovering ? [...arrivals, ...arrivals] : arrivals;

  // motion variant
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-12 md:py-20">
      {/* Header */}
      <div className="container mx-auto text-center mb-10 relative px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore New Arrivals
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Discover the latest styles straight off the runway — freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </motion.p>

        {/* Scroll Buttons */}
        <div className="absolute right-20 bottom-[-30px] space-x-2 hidden md:block">
          <button
            onClick={() => updatescroll("left")}
            className={`p-2 rounded border border-gray-200 text-black shadow-sm ${
              canscrollleft
                ? "cursor-pointer bg-white hover:bg-gray-100"
                : "cursor-not-allowed bg-gray-200"
            }`}
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            onClick={() => updatescroll("right")}
            className={`p-2 rounded border border-gray-200 text-black shadow-sm ${
              canscrollright
                ? "cursor-pointer bg-white hover:bg-gray-100"
                : "cursor-not-allowed bg-gray-200"
            }`}
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="container mx-auto overflow-x-hidden flex flex-row space-x-6 relative px-6"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setIsHovering(false)}
      >
        {displayItems.map((item, index) => (
          <motion.div
            key={index}
            className="min-w-[80%] md:min-w-[30%] relative flex-shrink-0 rounded-xl overflow-hidden group"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <motion.img
              src={item.images[0].url}
              alt={item.images[0].altText}
              className="w-full h-[400px] object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
              whileHover={{ scale: 1.05 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/product/${item._id}`} className="block">
                <h1 className="font-semibold text-lg">{item.name}</h1>
                <p className="text-sm opacity-90">${item.price}</p>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
