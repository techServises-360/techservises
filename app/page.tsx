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

      {/* TikTok Follow CTA */}
      {process.env.NEXT_PUBLIC_TIKTOK_URL && (
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative px-4 sm:px-6 py-8 sm:py-12"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden"
              style={{ background: '#2d3319' }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" 
                   style={{ background: '#FEFAE0', transform: 'translate(30%, -30%)' }}></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10" 
                   style={{ background: '#CCD5AE', transform: 'translate(-30%, 30%)' }}></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="#FEFAE0" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: '#FEFAE0' }}>
                      Follow Us on TikTok!
                    </h3>
                    <p className="text-sm sm:text-base" style={{ color: '#CCD5AE' }}>
                      Get daily tips, tutorials & behind-the-scenes
                    </p>
                  </div>
                </div>
                
                <motion.a
                  href={process.env.NEXT_PUBLIC_TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full font-bold text-lg shadow-xl transition-all whitespace-nowrap"
                  style={{ 
                    background: '#FEFAE0',
                    color: '#2d3319'
                  }}
                >
                  Follow Now
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Projects Showcase */}
      <ProjectShowcase />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}
