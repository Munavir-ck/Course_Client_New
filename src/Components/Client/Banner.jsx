import React from "react";
import { motion } from "framer-motion";

function Banner() {
  return (
    <div className="min-h-screen flex items-center bg-mycolors">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <div className="space-y-6">
              <motion.h2 
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-light text-white opacity-90"
              >
                Kids Learning Center
              </motion.h2>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold text-white leading-tight font-serif"
              >
                New Approach to<br/>Kids Education
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl"
              >
                Sea ipsum kasd eirmod kasd magna, est sea et diam ipsum est amet
                sed sit. Ipsum dolor no justo dolor et, lorem ut dolor erat dolore
                sed ipsum at ipsum nonumy amet.
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src="../../../header.png"
              alt="Happy Kids Learning"
              className="w-full max-w-xl object-contain rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Banner;