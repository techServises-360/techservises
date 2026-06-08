'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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

export default function ProjectShowcase() {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const handleImageClick = (e: React.MouseEvent, imageUrl: string) => {
    e.stopPropagation(); // Prevent project card click
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300); // Clear after animation
  };

  return (
    <section id="projects" ref={ref} className="relative px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" 
              style={{ color: '#2d3319' }}>
            Our Work
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" 
             style={{ color: '#5a6439' }}>
            Real results. Real clients. Real impact.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-xl" style={{ color: '#5a6439' }}>Loading projects...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl" style={{ color: '#5a6439' }}>No projects available yet.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project.id)}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              {/* Decorative Shape */}
              <motion.div 
                initial={{ scale: 0, rotate: 0 }}
                animate={isInView ? { scale: 1, rotate: 360 } : { scale: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-40 group-hover:opacity-60 transition-opacity"
                style={{ background: project.color }}
              />
              
              {/* Project Card */}
              <div 
                className="relative p-8 rounded-2xl shadow-lg border-2 transition-all duration-300 group-hover:shadow-2xl"
                style={{ 
                  background: '#FEFAE0',
                  borderColor: project.color
                }}
              >
                {/* Category Badge */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                  style={{ 
                    background: project.color,
                    color: '#2d3319'
                  }}
                >
                  {project.category}
                </motion.div>

                {/* Project Image with View Button */}
                {project.image && (
                  <div 
                    className="mb-4 rounded-xl overflow-hidden relative cursor-pointer"
                    onClick={(e) => handleImageClick(e, project.image!)}
                    onMouseEnter={() => setHoveredImageId(project.id)}
                    onMouseLeave={() => setHoveredImageId(null)}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-all duration-300"
                    />
                    {/* View Image Overlay */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: hoveredImageId === project.id ? 'rgba(0, 0, 0, 0.7)' : 'transparent'
                      }}
                    >
                      <div
                        className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-xl transition-all duration-300"
                        style={{ 
                          background: '#FEFAE0', 
                          color: '#2d3319',
                          opacity: hoveredImageId === project.id ? 1 : 0,
                          transform: hoveredImageId === project.id ? 'scale(1)' : 'scale(0.75)'
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>View Image</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Project Title */}
                <h3 className="text-2xl font-bold mb-3" 
                    style={{ color: '#2d3319' }}>
                  {project.title}
                </h3>

                {/* Project Description - Limited to 2 lines with ellipsis */}
                <p 
                  className="mb-6 text-base"
                  style={{ 
                    color: '#5a6439',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '3rem'
                  }}
                >
                  {project.description}
                </p>

                {/* Action Buttons - Fixed mobile layout */}
                <div className="flex flex-col gap-2.5 w-full">
                  {/* View Live Button - Only show if URL exists */}
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 shadow-lg w-full"
                      style={{ 
                        background: project.color,
                        color: '#2d3319'
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Live
                    </a>
                  )}

                  {/* View Details Button - Full width */}
                  <button
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 shadow-lg w-full"
                    style={{ 
                      background: '#2d3319',
                      color: '#FEFAE0'
                    }}
                  >
                    <span>View Details</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Decorative Corner Shape */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="absolute bottom-0 right-0 w-16 h-16 opacity-20"
                  style={{ 
                    background: project.color,
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {/* Decorative Background Shapes with Scroll Animation */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 0.2 } : { x: -100, opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-0 w-32 h-32 rounded-full" 
          style={{ background: '#E0E5B6', transform: 'translateY(-50%)' }}
        />
        <motion.div 
          initial={{ x: 100, opacity: 0, rotate: 0 }}
          animate={isInView ? { x: 0, opacity: 0.2, rotate: 45 } : { x: 100, opacity: 0, rotate: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-1/3 right-0 w-40 h-40" 
          style={{ 
            background: '#FAEDCE',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}
        />
      </div>

      {/* Image Viewer Modal */}
      {imageModalOpen && selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
          onClick={closeImageModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 p-2 rounded-full transition-all hover:scale-110"
              style={{ background: '#FEFAE0', color: '#2d3319' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedImage}
              alt="Project preview"
              className="w-full h-auto rounded-2xl shadow-2xl"
              style={{ maxHeight: '85vh', objectFit: 'contain' }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
