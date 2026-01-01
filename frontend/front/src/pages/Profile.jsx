import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await authAPI.updateProfile(formData);
      
      if (result.success) {
        const updatedUser = { ...user, ...result.data };
        updateUser(updatedUser);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      zipCode: user.zipCode || ''
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-500/20"></div>
        <div className="absolute top-20 right-20 w-40 h-40 border border-amber-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border border-orange-400/30 rounded-lg rotate-12 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-amber-300/20 rounded-full"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg rotate-45 opacity-30 animate-bounce"></div>
      <div className="absolute top-1/3 right-10 w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full opacity-25 animate-ping"></div>

      <div className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl mb-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <span className="text-white text-4xl font-bold">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">Profile Settings</h1>
            <p className="text-xl text-gray-300">Manage your account information and preferences</p>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`mb-8 p-6 rounded-2xl backdrop-blur-sm border ${
              message.type === 'success' 
                ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-200 border-green-400/30' 
                : 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-200 border-red-400/30'
            }`}>
              <div className="flex items-center">
                <span className="text-2xl mr-3">{message.type === 'success' ? '✅' : '⚠️'}</span>
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          )}

          {/* Profile Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm px-8 py-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center"
                  >
                    <span className="mr-2">✏️</span>
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500/80 hover:bg-gray-600/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-400/30"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <span className="mr-2">💾</span>
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSave} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">Full Name</label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter your full name"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ) : (
                    <p className="px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">{formData.name || 'Not provided'}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">Email Address</label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter your email"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ) : (
                    <p className="px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">{formData.email || 'Not provided'}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">Phone Number</label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ) : (
                    <p className="px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">{formData.phone || 'Not provided'}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-3 md:col-span-2">
                  <label className="block text-sm font-semibold text-white">Street Address</label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="123 Main Street"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ) : (
                    <p className="px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">{formData.address || 'Not provided'}</p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">City</label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="New York"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ) : (
                    <p className="px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">{formData.city || 'Not provided'}</p>
                  )}
                </div>

                {/* State */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">State</label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="NY"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ) : (
                    <p className="px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">{formData.state || 'Not provided'}</p>
                  )}
                </div>

                {/* Zip Code */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">ZIP Code</label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="10001"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ) : (
                    <p className="px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">{formData.zipCode || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </form>
        </div>

          {/* Account Statistics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 group hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-300">Total Orders</p>
                  <p className="text-3xl font-bold text-white">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 group hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-300">Completed</p>
                  <p className="text-3xl font-bold text-white">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 group hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-300">Total Spent</p>
                  <p className="text-3xl font-bold text-white">₹0.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
