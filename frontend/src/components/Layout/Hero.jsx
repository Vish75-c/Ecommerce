import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroimg from "../../assets/rabbit-hero.webp";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <motion.img
        src={heroimg}
        alt="hero background"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <motion.div
          className="text-center text-white px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Heading */}
          <motion.h1
            className="text-4xl md:text-8xl font-extrabold uppercase tracking-tighter mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Vacation <br /> Ready
          </motion.h1>

          {/* Quote */}
          <motion.p
            className="text-sm md:text-lg italic text-gray-200 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            “Style is a way to say who you are — without having to speak.”
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <Link
              to="#"
              className="bg-white text-gray-950 px-6 py-2 rounded-lg text-lg font-semibold 
                         hover:bg-gray-200 transition-all duration-300 shadow-md"
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

