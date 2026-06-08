'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const serviceTemplates = [
  {
    id: '',
    label: 'Select a service...',
    subject: '',
    template: ''
  },
  {
    id: 'website',
    label: 'I want a website',
    subject: 'Website Development Request',
    template: 'I am interested in getting a professional website built for my business.'
  },
  {
    id: 'ecommerce',
    label: 'I want an e-commerce store',
    subject: 'E-Commerce Development Request',
    template: 'I would like to build an online store to sell my products.'
  },
  {
    id: 'redesign',
    label: 'I want to redesign my existing site',
    subject: 'Website Redesign Request',
    template: 'I have an existing website that needs a modern redesign.'
  },
  {
    id: 'mobile',
    label: 'I want a mobile app',
    subject: 'Mobile App Development Request',
    template: 'I am looking to develop a mobile application for my business.'
  },
  {
    id: 'custom',
    label: 'Custom project',
    subject: 'Custom Project Inquiry',
    template: ''
  }
];

export default function ContactForm() {
  const [selectedService, setSelectedService] = useState(serviceTemplates[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleServiceChange = (serviceId: string) => {
    const service = serviceTemplates.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      if (service.id !== 'custom') {
        setCustomMessage(''); // Clear custom message when switching to template
      }
    }
  };

  // Check if form is valid and button should be enabled
  const isFormValid = () => {
    if (!name.trim() || !email.trim()) return false;
    if (!selectedService.id) return false; // No service selected
    if (selectedService.id === 'custom' && !customMessage.trim()) return false; // Custom selected but no message
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          service: selectedService.id,
          serviceLabel: selectedService.label,
          message: selectedService.id === 'custom' ? customMessage : selectedService.template,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      // Reset form
      setName('');
      setEmail('');
      setCustomMessage('');
      setSelectedService(serviceTemplates[0]);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="relative px-4 sm:px-6 py-12 sm:py-16" style={{ background: '#FAEDCE' }}>
      <div className="max-w-4xl mx-auto">
        {/* Decorative Background Shapes with Scroll Animation - Responsive sizing */}
        <motion.div 
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, rotate: 180, opacity: 0.3 } : { scale: 0, rotate: 0, opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-5 sm:top-10 left-5 sm:left-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full" 
          style={{ background: '#CCD5AE' }}
        />
        <motion.div 
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, rotate: 45, opacity: 0.3 } : { scale: 0, rotate: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-20 h-20 sm:w-32 sm:h-32" 
          style={{ 
            background: '#E0E5B6',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}
        />

        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4" 
                style={{ color: '#2d3319' }}>
              Let's Work Together
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" 
               style={{ color: '#5a6439' }}>
              Turn your vision into reality
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12 rounded-3xl shadow-2xl border-2"
            style={{ 
              background: '#FEFAE0',
              borderColor: '#CCD5AE'
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Service Selection Dropdown */}
              <div className="mb-6">
                <label 
                  className="block text-lg font-semibold mb-3"
                  style={{ color: '#2d3319' }}
                >
                  What can we help you with? *
                </label>
                <select
                  value={selectedService.id}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-all font-medium cursor-pointer"
                  style={{ 
                    background: '#FEFAE0',
                    borderColor: selectedService.id ? '#CCD5AE' : '#E0E5B6',
                    color: '#2d3319'
                  }}
                  required
                >
                  {serviceTemplates.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name Input */}
              <div className="mb-6">
                <label 
                  className="block text-lg font-semibold mb-2"
                  style={{ color: '#2d3319' }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-all"
                  style={{ 
                    background: '#FEFAE0',
                    borderColor: '#E0E5B6',
                    color: '#2d3319'
                  }}
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label 
                  className="block text-lg font-semibold mb-2"
                  style={{ color: '#2d3319' }}
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-all"
                  style={{ 
                    background: '#FEFAE0',
                    borderColor: '#E0E5B6',
                    color: '#2d3319'
                  }}
                  placeholder="john@example.com"
                />
              </div>

              {/* Custom Message Input - Only shown when "custom" is selected */}
              {selectedService.id === 'custom' && (
                <div className="mb-6">
                  <label 
                    className="block text-lg font-semibold mb-2"
                    style={{ color: '#2d3319' }}
                  >
                    Your Message *
                  </label>
                  <textarea
                    required
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={5}
                    className="w-full p-4 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-all resize-none"
                    style={{ 
                      background: '#FEFAE0',
                      borderColor: '#E0E5B6',
                      color: '#2d3319'
                    }}
                    placeholder="Tell us about your custom project..."
                  />
                </div>
              )}

              {/* Template Preview - Shown for non-custom selections */}
              {selectedService.id && selectedService.id !== 'custom' && selectedService.template && (
                <div className="mb-6 p-4 rounded-xl border-2" 
                     style={{ 
                       background: '#FAEDCE',
                       borderColor: '#E0E5B6'
                     }}>
                  <p className="text-sm font-semibold mb-2" 
                     style={{ color: '#5a6439' }}>
                    Email Preview:
                  </p>
                  <p className="text-base italic" 
                     style={{ color: '#2d3319' }}>
                    "{selectedService.template}"
                  </p>
                </div>
              )}

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl border-2"
                  style={{ 
                    background: '#CCD5AE',
                    borderColor: '#5a6439'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" style={{ color: '#2d3319' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="font-semibold" style={{ color: '#2d3319' }}>
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl border-2"
                  style={{ 
                    background: '#ffe4e1',
                    borderColor: '#ff6b6b'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" style={{ color: '#d32f2f' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="font-semibold" style={{ color: '#d32f2f' }}>
                      {errorMessage || 'Failed to send message. Please try again.'}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="w-full p-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-105"
                style={{ 
                  background: (isFormValid() && !isSubmitting) ? '#CCD5AE' : '#E0E5B6',
                  color: '#2d3319'
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : isFormValid() ? (
                  'Send Message'
                ) : (
                  'Please complete the form'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
