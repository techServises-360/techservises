'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id?: string;
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

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>({
    title: '',
    description: '',
    fullDescription: '',
    category: '',
    color: '#CCD5AE',
    image: '',
    websiteUrl: '',
    tiktokUrl: '',
    tags: [],
    features: [],
    technologies: [],
    published: true,
    order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    // Check if already logged in (simple localStorage check)
    const loggedIn = localStorage.getItem('adminLoggedIn');
    const savedUsername = localStorage.getItem('adminUsername');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      setLoggedInUsername(savedUsername || 'admin');
      fetchProjects();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        setLoggedInUsername(username);
        setIsLoggedIn(true);
        fetchProjects();
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    setIsLoggedIn(false);
    setProjects([]);
    setLoggedInUsername('');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loggedInUsername,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password changed successfully!');
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        alert(data.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Change password error:', error);
      alert('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = currentProject.id ? 'PUT' : 'POST';
      const response = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProject),
      });

      if (response.ok) {
        alert(currentProject.id ? 'Project updated!' : 'Project created!');
        resetForm();
        fetchProjects();
      } else {
        alert('Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Project deleted!');
        fetchProjects();
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setCurrentProject({
      title: '',
      description: '',
      fullDescription: '',
      category: '',
      color: '#CCD5AE',
      image: '',
      websiteUrl: '',
      tiktokUrl: '',
      tags: [],
      features: [],
      technologies: [],
      published: true,
      order: 0,
    });
    setIsEditing(false);
  };

  const handleArrayInput = (field: 'tags' | 'features' | 'technologies', value: string) => {
    setCurrentProject({
      ...currentProject,
      [field]: value.split(',').map(item => item.trim()).filter(item => item),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentProject({
          ...currentProject,
          image: data.imageUrl,
        });
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FEFAE0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#2d3319' }}>
              Admin Login
            </h1>
            <p style={{ color: '#5a6439' }}>
              Enter your credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-8 rounded-2xl border-2" style={{ background: '#FEFAE0', borderColor: '#CCD5AE' }}>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2" style={{ color: '#2d3319' }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-xl border-2"
                style={{ background: '#FEFAE0', borderColor: '#E0E5B6', color: '#2d3319' }}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2" style={{ color: '#2d3319' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border-2"
                style={{ background: '#FEFAE0', borderColor: '#E0E5B6', color: '#2d3319' }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 rounded-xl font-bold transition-all hover:scale-105"
              style={{ background: '#CCD5AE', color: '#2d3319' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center mt-4 text-sm" style={{ color: '#5a6439' }}>
            Default: username: <strong>admin</strong>, password: <strong>admin123</strong>
          </p>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen" style={{ background: '#FEFAE0' }}>
      {/* Header */}
      <div className="p-6 border-b-2" style={{ background: '#CCD5AE', borderColor: '#E0E5B6' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <h1 className="text-3xl font-bold" style={{ color: '#2d3319' }}>
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
              style={{ background: '#E0E5B6', color: '#2d3319' }}
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl font-semibold transition-all hover:scale-105"
              style={{ background: '#FEFAE0', color: '#2d3319' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Project Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-8 rounded-2xl border-2"
          style={{ background: '#FAEDCE', borderColor: '#CCD5AE' }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#2d3319' }}>
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Title</label>
                <input
                  type="text"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  className="w-full p-3 rounded-xl border-2"
                  style={{ background: '#FEFAE0', borderColor: '#E0E5B6' }}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Category</label>
                <input
                  type="text"
                  value={currentProject.category}
                  onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                  className="w-full p-3 rounded-xl border-2"
                  style={{ background: '#FEFAE0', borderColor: '#E0E5B6' }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Short Description</label>
              <input
                type="text"
                value={currentProject.description}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                className="w-full p-3 rounded-xl border-2"
                style={{ background: '#FEFAE0', borderColor: '#E0E5B6' }}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Full Description</label>
              <textarea
                value={currentProject.fullDescription}
                onChange={(e) => setCurrentProject({ ...currentProject, fullDescription: e.target.value })}
                rows={4}
                className="w-full p-3 rounded-xl border-2 resize-none"
                style={{ background: '#FEFAE0', borderColor: '#E0E5B6' }}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 rounded-xl border-2"
                style={{ background: '#FEFAE0', borderColor: '#E0E5B6', color: '#2d3319' }}
                disabled={uploadingImage}
              />
              {uploadingImage && (
                <p className="text-sm mt-2" style={{ color: '#5a6439' }}>Uploading image...</p>
              )}
              {currentProject.image && (
                <div className="mt-3">
                  <img 
                    src={currentProject.image} 
                    alt="Project preview" 
                    className="w-full max-w-xs rounded-xl border-2"
                    style={{ borderColor: '#E0E5B6' }}
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentProject({ ...currentProject, image: '' })}
                    className="mt-2 px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{ background: '#E0E5B6', color: '#2d3319' }}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>
                Website URL (Optional)
              </label>
              <input
                type="url"
                value={currentProject.websiteUrl || ''}
                onChange={(e) => setCurrentProject({ ...currentProject, websiteUrl: e.target.value })}
                className="w-full p-3 rounded-xl border-2"
                style={{ background: '#FEFAE0', borderColor: '#E0E5B6', color: '#2d3319' }}
                placeholder="https://example.com"
              />
              <p className="text-xs mt-1" style={{ color: '#5a6439' }}>
                Add a link to the live website. Leave empty if not available.
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>
                TikTok Profile URL (Optional)
              </label>
              <input
                type="url"
                value={currentProject.tiktokUrl || ''}
                onChange={(e) => setCurrentProject({ ...currentProject, tiktokUrl: e.target.value })}
                className="w-full p-3 rounded-xl border-2"
                style={{ background: '#FEFAE0', borderColor: '#E0E5B6', color: '#2d3319' }}
                placeholder="https://tiktok.com/@username"
              />
              <p className="text-xs mt-1" style={{ color: '#5a6439' }}>
                Add a link to the project's TikTok profile. Leave empty to hide the icon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Color (Hex)</label>
                <select
                  value={currentProject.color}
                  onChange={(e) => setCurrentProject({ ...currentProject, color: e.target.value })}
                  className="w-full p-3 rounded-xl border-2"
                  style={{ background: '#FEFAE0', borderColor: '#E0E5B6' }}
                >
                  <option value="#CCD5AE">#CCD5AE (Sage)</option>
                  <option value="#E0E5B6">#E0E5B6 (Mint)</option>
                  <option value="#FAEDCE">#FAEDCE (Cream)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Order</label>
                <input
                  type="number"
                  value={currentProject.order}
                  onChange={(e) => setCurrentProject({ ...currentProject, order: parseInt(e.target.value) })}
                  className="w-full p-3 rounded-xl border-2"
                  style={{ background: '#FEFAE0', borderColor: '#E0E5B6' }}
                />
              </div>

              <div>
                <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Published</label>
                <select
                  value={currentProject.published ? 'true' : 'false'}
                  onChange={(e) => setCurrentProject({ ...currentProject, published: e.target.value === 'true' })}
                  className="w-full p-3 rounded-xl border-2"
                  style={{ background: '#FEFAE0', borderColor: '#E0E5B6' }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Tags (comma-separated)</label>
              <input
                type="text"
                value={currentProject.tags.join(', ')}
                onChange={(e) => handleArrayInput('tags', e.target.value)}
                className="w-full p-3 rounded-xl border-2"
                style={{ background: '#FEFAE0', borderColor: '#E0E5B6' }}
                placeholder="Next.js, React, Tailwind"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Features (comma-separated)</label>
              <textarea
                value={currentProject.features.join(', ')}
                onChange={(e) => handleArrayInput('features', e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl border-2 resize-none"
                style={{ background: '#FEFAE0', borderColor: '#E0E5B6' }}
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>Technologies (comma-separated)</label>
              <input
                type="text"
                value={currentProject.technologies.join(', ')}
                onChange={(e) => handleArrayInput('technologies', e.target.value)}
                className="w-full p-3 rounded-xl border-2"
                style={{ background: '#FEFAE0', borderColor: '#E0E5B6' }}
                placeholder="Next.js, PostgreSQL, Stripe"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 p-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{ background: '#CCD5AE', color: '#2d3319' }}
              >
                {loading ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 p-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{ background: '#E0E5B6', color: '#2d3319' }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Projects List */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#2d3319' }}>
            All Projects ({projects.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 rounded-xl border-2"
                style={{ background: '#FEFAE0', borderColor: project.color }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{ background: project.color, color: '#2d3319' }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="px-2 py-1 rounded text-xs font-bold"
                    style={{ background: project.published ? '#CCD5AE' : '#E0E5B6', color: '#2d3319' }}
                  >
                    {project.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2" style={{ color: '#2d3319' }}>
                  {project.title}
                </h3>

                <p className="text-sm mb-4" style={{ color: '#5a6439' }}>
                  {project.description}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
                    style={{ background: '#CCD5AE', color: '#2d3319' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id!)}
                    className="px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
                    style={{ background: '#E0E5B6', color: '#2d3319' }}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {projects.length === 0 && (
            <p className="text-center text-lg py-12" style={{ color: '#5a6439' }}>
              No projects yet. Create your first one above!
            </p>
          )}
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-8 rounded-2xl border-2"
              style={{ background: '#FEFAE0', borderColor: '#CCD5AE' }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#2d3319' }}>
                Change Password
              </h2>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full p-3 rounded-xl border-2"
                    style={{ background: '#FEFAE0', borderColor: '#E0E5B6', color: '#2d3319' }}
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full p-3 rounded-xl border-2"
                    style={{ background: '#FEFAE0', borderColor: '#E0E5B6', color: '#2d3319' }}
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2" style={{ color: '#2d3319' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full p-3 rounded-xl border-2"
                    style={{ background: '#FEFAE0', borderColor: '#E0E5B6', color: '#2d3319' }}
                    required
                    minLength={6}
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 p-3 rounded-xl font-bold transition-all hover:scale-105"
                    style={{ background: '#CCD5AE', color: '#2d3319' }}
                  >
                    {loading ? 'Changing...' : 'Change Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="px-6 p-3 rounded-xl font-bold transition-all hover:scale-105"
                    style={{ background: '#E0E5B6', color: '#2d3319' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
