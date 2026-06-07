'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  color: string;
  image?: string;
  websiteUrl?: string;
  tiktokUrl?: string;
  tags: string[];
  features: string[];
  technologies: string[];
  published: boolean;
  order: number;
}

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const response = await fetch('/api/projects');
      const projects = await response.json();
      const foundProject = projects.find((p: Project) => p.id === params.id);
      setProject(foundProject || null);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FEFAE0' }}>
        <p className="text-2xl" style={{ color: '#2d3319' }}>Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FEFAE0' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2d3319' }}>Project Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            style={{ background: '#CCD5AE', color: '#2d3319' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FEFAE0' }}>
      {/* Back Button & Logo Section - Mobile responsive */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between max-w-7xl mx-auto w-full"
      >
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base font-semibold transition-all hover:scale-105"
          style={{ background: '#CCD5AE', color: '#2d3319' }}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Back to Projects</span>
          <span className="sm:hidden">Back</span>
        </button>
        
        <Image
          src="/logo.png"
          alt="TechServices Logo"
          width={60}
          height={60}
          className="drop-shadow-lg w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
        />
      </motion.div>

      {/* Hero Section - Mobile responsive */}
      <section className="relative px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
        {/* Animated Background Shapes - Responsive sizing */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute top-5 sm:top-10 right-5 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full" 
          style={{ background: project.color }}
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-10 sm:bottom-20 left-5 sm:left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" 
          style={{ 
            background: '#E0E5B6',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge - Mobile responsive */}
            <div 
              className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold mb-4 sm:mb-6"
              style={{ 
                background: project.color,
                color: '#2d3319'
              }}
            >
              {project.category}
            </div>

            {/* Title - Mobile responsive */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" 
                style={{ color: '#2d3319' }}>
              {project.title}
            </h1>

            {/* Short Description - Mobile responsive */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8" 
               style={{ color: '#5a6439' }}>
              {project.description}
            </p>

            {/* Project Image - Mobile responsive */}
            {project.image && (
              <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border-2" style={{ borderColor: project.color }}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ 
                    background: '#FAEDCE',
                    color: '#2d3319'
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Action Buttons - Mobile responsive */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
              {/* View Live Website Button - Only show if URL exists */}
              {project.websiteUrl && (
                <motion.a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all hover:scale-105 shadow-xl"
                  style={{ 
                    background: project.color,
                    color: '#2d3319'
                  }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live Website
                </motion.a>
              )}

              {/* TikTok Button - Only show if URL exists */}
              {project.tiktokUrl && (
                <motion.a
                  href={project.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all hover:scale-105 shadow-xl"
                  style={{ 
                    background: '#2d3319',
                    color: '#FEFAE0'
                  }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                  View on TikTok
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Full Description - No border on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-0 sm:p-6 lg:p-8 sm:rounded-2xl sm:border-2"
              style={{ 
                background: 'transparent',
                borderColor: project.color
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: '#2d3319' }}>
                About This Project
              </h2>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#5a6439' }}>
                {project.fullDescription}
              </p>
            </motion.div>

            {/* Features List - No border on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-0 sm:p-6 lg:p-8 sm:rounded-2xl sm:border-2"
              style={{ 
                background: 'transparent',
                borderColor: '#E0E5B6'
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#2d3319' }}>
                Key Features
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ background: project.color }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="#2d3319" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg" style={{ color: '#5a6439' }}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Technologies Used - No border on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 sm:mt-12 p-0 sm:p-6 lg:p-8 sm:rounded-2xl sm:border-2"
            style={{ 
              background: 'transparent',
              borderColor: '#CCD5AE'
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#2d3319' }}>
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {project.technologies.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-base sm:text-lg shadow-md"
                  style={{ 
                    background: '#FEFAE0',
                    color: '#2d3319',
                    border: `2px solid ${project.color}`
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 sm:mt-12 p-8 sm:p-12 rounded-2xl text-center"
            style={{ background: project.color }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: '#2d3319' }}>
              Want a Similar Project?
            </h2>
            <p className="text-lg mb-6" style={{ color: '#5a6439' }}>
              Let's discuss how we can build something amazing for you
            </p>
            <button
              onClick={() => router.push('/#contact')}
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl"
              style={{ 
                background: '#FEFAE0',
                color: '#2d3319'
              }}
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
