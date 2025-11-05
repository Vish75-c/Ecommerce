import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2';

/**
 * Features.jsx
 * Standalone React (JavaScript) component version of your Features section.
 * - Keeps the exact structure & copy you provided
 * - Adds small accessibility improvements and subtle Framer Motion enter/hover animations
 * - Accepts a `features` prop if you want to override the defaults
 *
 * Usage:
 * import Features from './Features';
 * <Features />
 *
 */

const defaultFeatures = [
  {
    id: 'shipping',
    title: 'FREE INTERNATIONAL SHOPPING',
    desc: 'On all orders above $500.00',
    icon: <HiShoppingBag size={22} aria-hidden />,
  },
  {
    id: 'returns',
    title: '45 DAYS RETURN',
    desc: 'Money back guarantee.',
    icon: <HiArrowPathRoundedSquare size={22} aria-hidden />,
  },
  {
    id: 'secure',
    title: 'SECURE CHECKOUT',
    desc: 'On all orders above $500.00',
    icon: <HiOutlineCreditCard size={22} aria-hidden />,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 16 } },
};

export default function Features({ features = defaultFeatures }) {
  return (
    <motion.section
      className="px-6 pb-10 md:px-10 flex flex-col md:flex-row md:space-y-6 justify-evenly"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      aria-label="Shop features"
      role="list"
    >
      {features.map((f) => (
        <motion.article
          key={f.id}
          variants={item}
          className="flex flex-col items-center text-center px-2 py-4 max-w-xs"
          role="listitem"
          tabIndex={0}
          aria-labelledby={`feature-${f.id}-title`}
        >
          <div className="p-2 mb-2 text-black bg-white rounded-full shadow-sm inline-flex items-center justify-center">
            {/* icon provided in the feature object; keep size consistent */}
            {f.icon}
          </div>

          <h3 id={`feature-${f.id}-title`} className="tracking-tighter mb-1 text-sm font-semibold uppercase">
            {f.title}
          </h3>

          <p className="tracking-tighter mb-1 text-gray-500 text-xs">{f.desc}</p>
        </motion.article>
      ))}
    </motion.section>
  );
}
