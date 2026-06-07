'use client';

import ProjectShowcase from './components/ProjectShowcase';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FEFAE0' }}>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-12 sm:py-20 overflow-hidden">
        {/* Animated Background Shapes - Responsive sizing */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-5 sm:top-10 left-5 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full" 
          style={{ background: '#CCD5AE' }}
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 rounded-full" 
          style={{ background: '#E0E5B6' }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Logo - Responsive sizing */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <Image
              src="/logo.png"
              alt="TechServices Logo"
              width={100}
              height={100}
              priority
              className="drop-shadow-2xl w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40"
            />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 px-4" 
            style={{ color: '#2d3319' }}
          >
            TechServices
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 px-4" 
            style={{ color: '#5a6439' }}
          >
            Crafting Beautiful Web Experiences
          </motion.p>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-3 sm:gap-4 flex-wrap"
          >
            <div className="w-16 sm:w-20 h-1 rounded-full" style={{ background: '#CCD5AE' }}></div>
            <div className="w-16 sm:w-20 h-1 rounded-full" style={{ background: '#E0E5B6' }}></div>
            <div className="w-16 sm:w-20 h-1 rounded-full" style={{ background: '#FAEDCE' }}></div>
          </motion.div>
        </div>
      </section>

      {/* Projects Showcase */}
      <ProjectShowcase />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}
