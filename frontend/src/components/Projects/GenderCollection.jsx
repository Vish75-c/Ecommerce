import React from "react";
import { motion } from "framer-motion";
import menImg from "../../assets/mens-collection.webp";
import womenImg from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollection = () => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section className="py-16 px-4 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Women's Collection */}
        <motion.div
          className="relative flex-1 overflow-hidden rounded-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.img
            src={womenImg}
            alt="women-img"
            className="w-full h-[550px] md:h-[700px] object-cover rounded-md hover:scale-105 transition-transform duration-700"
            whileHover={{ scale: 1.05 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 rounded-md bg-white/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Women&apos;s Collection
            </h1>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline font-medium hover:text-gray-700"
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>

        {/* Men's Collection */}
        <motion.div
          className="relative flex-1 overflow-hidden rounded-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.img
            src={menImg}
            alt="men-img"
            className="w-full h-[550px] md:h-[700px] object-cover rounded-md hover:scale-105 transition-transform duration-700"
            whileHover={{ scale: 1.05 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 rounded-md bg-white/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Men&apos;s Collection
            </h1>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline font-medium hover:text-gray-700"
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GenderCollection;
