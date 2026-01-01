import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={logo} 
                alt="Build Bazaar X Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-amber-400">BuildBazaarX</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for furniture, woodwork materials, and expert craftman.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.53L4.5 16.5l-1.5-1.5 2.25-2.25c.757.934 1.908 1.53 3.205 1.53 2.209 0 4-1.791 4-4s-1.791-4-4-4c-1.297 0-2.448.596-3.205 1.53L4.5 7.5l1.5 1.5-2.25 2.25c-.757-.934-1.908-1.53-3.205-1.53-2.209 0-4 1.791-4 4s1.791 4 4 4c1.297 0 2.448-.596 3.205-1.53L8.5 16.5l1.5 1.5-2.25 2.25c-.757-.934-1.908-1.53-3.205-1.53z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/marketplace" className="text-gray-300 hover:text-amber-400 transition-colors">Marketplace</Link></li>
              <li><Link to="/professionals" className="text-gray-300 hover:text-amber-400 transition-colors">Craftman</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-amber-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Ready-Made Furniture</span></li>
              <li><span className="text-gray-300">Wood & Materials</span></li>
              <li><span className="text-gray-300">Custom Furniture</span></li>
              <li><span className="text-gray-300">Craftman Booking</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <p className="text-gray-300">📧 info@buildbazaax.com</p>
              <p className="text-gray-300">📞 91+ 9521259456, 8306813974</p>
              <p className="text-gray-300">📍 pratap Nagar Jaipur Rajasthan</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 BuildBazaarX. All rights reserved. | 
            <a href="#" className="hover:text-amber-400 transition-colors ml-2">Privacy Policy</a> | 
            <a href="#" className="hover:text-amber-400 transition-colors ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
