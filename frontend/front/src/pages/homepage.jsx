import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/image.png'
const Homepage = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section with Split Design */}
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/20 z-10"></div>
          <img
            src={image} // User will add image source here
            alt="Modern Building Architecture"
            className="w-full h-full object-cover"
          />
          {/* Floating Elements */}
          <div className="absolute top-20 right-10 w-24 h-24 bg-amber-400 rounded-full opacity-80 animate-pulse z-20"></div>
          <div className="absolute bottom-32 left-10 w-16 h-16 bg-orange-500 rounded-lg rotate-45 opacity-70 animate-bounce z-20"></div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden py-12 lg:py-0">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-500/20"></div>
            <div className="absolute top-20 right-20 w-40 h-40 border border-amber-400/30 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 border border-orange-400/30 rounded-lg rotate-12"></div>
          </div>

          <div className="text-center px-12 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Build</span>
              <span className="text-amber-400"> Bazaar</span>
              <span className="text-orange-400"> X</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mb-8"></div>

            <p className="text-xl text-gray-300 mb-4 leading-relaxed">
              Premium Furniture & Expert Craftsmanship
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto">
              Transform your space with our curated collection and professional craftman services
            </p>

          </div>
        </div>
      </section>

      {/* Services Section - Cards Layout */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-orange-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Our Premium Services
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create extraordinary living spaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Ready-Made Furniture */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready-Made Furniture</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Discover our curated collection of premium furniture designed to elevate every corner of your home with style and functionality.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                    <span>Living Room Collections</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    <span>Bedroom Essentials</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                    <span>Office Solutions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Materials Supply */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🪵</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Materials</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Source the finest quality wood, laminates, and construction materials to bring your custom furniture visions to reality.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    <span>Premium Plywood</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    <span>Designer Laminates</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    <span>Hardware & Accessories</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carpenter Booking */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔨</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Craftsmen</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Connect with skilled artisans who transform raw materials into bespoke furniture pieces tailored to your exact specifications.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Custom Design</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                    <span>Professional Installation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Maintenance Services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Design */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 border border-amber-400/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-orange-400/20 rounded-lg rotate-45"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                100+
              </div>
              <div className="text-gray-300 text-lg">Happy Customers</div>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-2 group-hover:w-16 transition-all duration-300"></div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                100+
              </div>
              <div className="text-gray-300 text-lg">Premium Products</div>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-2 group-hover:w-16 transition-all duration-300"></div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-gray-300 text-lg">Master Craftsmen</div>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-2 group-hover:w-16 transition-all duration-300"></div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-300 text-lg">Expert Support</div>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-2 group-hover:w-16 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Modern Approach */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-orange-50 relative">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 100+ of satisfied customers who've created their dream homes with our premium furniture and expert craftsmanship.
          </p>

        </div>

        {/* Floating decoration */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 rounded-lg rotate-12 opacity-50 animate-bounce"></div>
      </section>

    </div>
  );
};

export default Homepage;