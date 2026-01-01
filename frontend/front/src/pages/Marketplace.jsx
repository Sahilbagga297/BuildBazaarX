import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import deskImg from '../assets/desk.jpg';
import hardwarekitImg from '../assets/hardwarekit.jpg';
import kitchencabinetImg from '../assets/kitchencabinet.jpg';
import laminatesImg from '../assets/laminates.jpg';
import oaktableImg from '../assets/oaktable.jpg';
import plywoodImg from '../assets/plywood.jpg';
import shelfImg from '../assets/shelf.jpg';
import sunmaikaImg from '../assets/sunmaika.jpg';
import livingRoomImg from '../assets/modernliving.jpg';
import marketplaceHeroImg from '../assets/market place.png';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState({});
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { addToCart, isInCart, getItemQuantity, getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSearch = () => {
    // Scroll to products section when searching
    scrollToSection('products');
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Handle adding item to cart with login check
  const handleAddToCart = async (item) => {
    try {
      await addToCart(item);
      // If successful, item was added to cart
    } catch (error) {
      if (error.message === 'LOGIN_REQUIRED') {
        setShowLoginPrompt(true);
      }
    }
  };

  // Handle login prompt actions
  const handleLoginPrompt = (action) => {
    setShowLoginPrompt(false);
    if (action === 'login') {
      navigate('/login');
    }
  };

  const furnitureItems = [
    {
      id: 1,
      name: "Modern Living Room Set",
      price: "₹1,07,817",
      originalPrice: "₹1,32,717",
      image: livingRoomImg,
      category: "living",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
      description: "Contemporary design with premium upholstery"
    },
    {
      id: 2,
      name: "Oak Dining Table",
      price: "₹49,717",
      originalPrice: "₹66,317",
      image: oaktableImg,
      category: "dining",
      rating: 4.9,
      reviews: 89,
      badge: "New Arrival",
      description: "Solid oak construction with elegant finish"
    },
    {
      id: 3,
      name: "King Size Bed Frame",
      price: "₹74,617",
      originalPrice: "₹99,517",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "bedroom",
      rating: 4.7,
      reviews: 156,
      badge: "Sale",
      description: "Luxurious comfort with modern aesthetics"
    },
    {
      id: 4,
      name: "Executive Office Desk",
      price: "₹37,267",
      originalPrice: "₹45,567",
      image: deskImg,
      category: "office",
      rating: 4.6,
      reviews: 78,
      badge: "Featured",
      description: "Professional workspace solution"
    },
    {
      id: 5,
      name: "Modular Bookshelf Unit",
      price: "₹24,817",
      originalPrice: "₹33,117",
      image: shelfImg,
      category: "storage",
      rating: 4.8,
      reviews: 92,
      badge: "Eco-Friendly",
      description: "Sustainable wood with modular design"
    },
    {
      id: 6,
      name: "Premium Kitchen Cabinet Set",
      price: "₹1,32,717",
      originalPrice: "₹1,65,917",
      image: kitchencabinetImg,
      category: "kitchen",
      rating: 4.9,
      reviews: 203,
      badge: "Premium",
      description: "Complete kitchen transformation solution"
    }
  ];

  const materials = [
    {
      id: 101,
      name: "Premium Plywood",
      price: "₹3,735/sq ft",
      originalPrice: "₹4,565/sq ft",
      image: plywoodImg,
      category: "wood",
      rating: 4.7,
      reviews: 67,
      badge: "Grade A",
      description: "High-quality marine grade plywood"
    },
    {
      id: 102,
      name: "Designer Laminates",
      price: "₹2,075/sq ft",
      originalPrice: "₹2,905/sq ft",
      image: laminatesImg,
      category: "surface",
      rating: 4.6,
      reviews: 45,
      badge: "Trendy",
      description: "Modern patterns and textures"
    },
    {
      id: 103,
      name: "Sunmica Sheets",
      price: "₹2,905/sq ft",
      originalPrice: "₹3,735/sq ft",
      image: sunmaikaImg,
      category: "finish",
      rating: 4.8,
      reviews: 89,
      badge: "Durable",
      description: "Premium finish with long-lasting quality"
    },
    {
      id: 104,
      name: "Complete Hardware Kit",
      price: "₹7,387",
      originalPrice: "₹9,960",
      image: hardwarekitImg,
      category: "accessories",
      rating: 4.9,
      reviews: 156,
      badge: "Complete Set",
      description: "All essential hardware in one package"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'furniture', name: 'Furniture', icon: '🪑' },
    { id: 'materials', name: 'Materials', icon: '🪵' }
  ];

  const allItems = [...furnitureItems, ...materials];
  const filteredItems = allItems.filter(item => {
    let matchesCategory = false;
    
    if (selectedCategory === 'all') {
      matchesCategory = true;
    } else if (selectedCategory === 'furniture') {
      // Check if item is from furnitureItems array
      matchesCategory = furnitureItems.some(furniture => furniture.id === item.id);
    } else if (selectedCategory === 'materials') {
      // Check if item is from materials array
      matchesCategory = materials.some(material => material.id === item.id);
    }
    
    // Enhanced search functionality - search in name, description, and category
    const searchTerm = searchQuery.toLowerCase().trim();
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      (item.badge && item.badge.toLowerCase().includes(searchTerm));
    
    return matchesCategory && matchesSearch;
  });

  const getBadgeColor = (badge) => {
    const colors = {
      'Best Seller': 'from-red-500 to-pink-500',
      'New Arrival': 'from-green-500 to-emerald-500',
      'Sale': 'from-orange-500 to-red-500',
      'Featured': 'from-blue-500 to-indigo-500',
      'Premium': 'from-purple-500 to-pink-500',
      'Eco-Friendly': 'from-green-400 to-teal-500',
      'Grade A': 'from-amber-500 to-orange-500',
      'Trendy': 'from-pink-500 to-rose-500',
      'Durable': 'from-slate-500 to-gray-600',
      'Complete Set': 'from-indigo-500 to-purple-500'
    };
    return colors[badge] || 'from-gray-500 to-slate-500';
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-amber-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-48 h-48 bg-orange-400/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400/15 rounded-full animate-ping"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-3 mb-8">
                  <span className="text-amber-300 text-sm font-medium">🛒 Premium Marketplace</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                    Market
                  </span>
                  <br />
                  <span className="text-amber-400">place</span>
                </h1>
                
                <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto lg:mx-0 leading-relaxed">
                  Discover premium furniture and materials with quality that meets affordability in our curated collection.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <button 
                    onClick={() => scrollToSection('products')}
                    className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    <span className="relative z-10">Browse Products</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative group">
                  <img 
                    src={marketplaceHeroImg} 
                    alt="Marketplace - Premium Furniture and Materials" 
                    className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-3xl"></div>
                  
                  {/* Floating decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400/80 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400/60 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Bar Section - Extended from Hero */}
        <div className="relative z-10 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Find What You're Looking For
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Search our premium collection of furniture and materials
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-5 lg:pl-6 flex items-center pointer-events-none z-10">
                  <div className="relative">
                    <span className="text-gray-300 text-xl lg:text-2xl transition-all duration-300 group-focus-within:text-amber-400 group-focus-within:scale-110">🔍</span>
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                {/* Main Search Input */}
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search furniture, materials, brands, or categories..."
                  className="w-full pl-16 lg:pl-20 pr-24 lg:pr-28 py-4 lg:py-5 rounded-3xl text-gray-900 bg-white/15 backdrop-blur-md border-2 border-white/30 focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:border-amber-400 focus:bg-white/20 placeholder-gray-400 text-base lg:text-lg font-medium transition-all duration-300 shadow-xl hover:shadow-2xl focus:shadow-2xl"
                />
                
                {/* Clear Button */}
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="absolute right-20 lg:right-24 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-400/20 hover:bg-gray-400/30 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                    title="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                
                {/* Search Button */}
                <button 
                  onClick={handleSearch}
                  className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-6 lg:px-8 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm lg:text-base flex items-center space-x-2 shadow-xl"
                >
                  <span>Search</span>
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                
                {/* Animated Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-red-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                
                {/* Floating Particles Effect */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-amber-400/60 rounded-full animate-ping opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400/60 rounded-full animate-bounce opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 delay-200"></div>
              </div>
              
              {/* Search Suggestions/Quick Filters */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="text-sm text-gray-400 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">Try: "sofa"</span>
                <span className="text-sm text-gray-400 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">Try: "plywood"</span>
                <span className="text-sm text-gray-400 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">Try: "kitchen"</span>
                <span className="text-sm text-gray-400 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">Try: "bedroom"</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-orange-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '100+', label: 'Products' },
              { number: '30+', label: 'Brands' },
              { number: '100+', label: 'Happy Customers' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">{stat.number}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white" data-animate id="categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6">
              <span className="text-blue-600 text-sm font-semibold">🏷️ Shop by Category</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Collections</h2>
            <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-2xl scale-105'
                    : 'bg-white hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 text-gray-700 hover:text-amber-600 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <div className="text-lg font-semibold">{category.name}</div>
                
                {selectedCategory === category.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 animate-pulse rounded-2xl"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
                {searchQuery && (
                  <span className="text-2xl text-amber-600 ml-3">
                    for "{searchQuery}"
                  </span>
                )}
              </h2>
              <p className="text-gray-600">
                {filteredItems.length} product{filteredItems.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                Sort by: Popular
              </button>
            </div>
          </div>
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No products found for "${searchQuery}". Try a different search term.`
                  : 'No products match your current filters. Try adjusting your search criteria.'
                }
              </p>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-400 hover:to-orange-400 transition-all duration-300"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden ${
                  isVisible.products ? `animate-fade-in-up delay-${index * 100}` : 'opacity-0'
                }`}
              >
                {/* Product Badge */}
                {item.badge && (
                  <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getBadgeColor(item.badge)}`}>
                    {item.badge}
                  </div>
                )}
                
                {/* Product Image */}
                <div className="relative p-8 bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-amber-50 group-hover:to-orange-50 transition-all duration-500">
                  <div className="w-full h-48 mb-4 transform group-hover:scale-110 transition-transform duration-500 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-6xl" style={{display: 'none'}}>
                      {item.name.includes('Living') ? '🛋️' : 
                       item.name.includes('Dining') ? '🍽️' : 
                       item.name.includes('Bed') ? '🛏️' : 
                       item.name.includes('Desk') ? '🖥️' : 
                       item.name.includes('Bookshelf') ? '📚' : 
                       item.name.includes('Kitchen') ? '🏠' : 
                       item.name.includes('Plywood') ? '🪵' : 
                       item.name.includes('Laminates') ? '🎨' : 
                       item.name.includes('Sunmica') ? '✨' : 
                       item.name.includes('Hardware') ? '🔧' : '📦'}
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                      ❤️
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                      👁️
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-amber-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-sm">
                          {i < Math.floor(item.rating) ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {item.rating} ({item.reviews} reviews)
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-amber-600">{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                      )}
                    </div>
                    {item.originalPrice && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
                        Save {Math.round(((parseInt(item.originalPrice.replace(/[^0-9]/g, '')) - parseInt(item.price.replace(/[^0-9]/g, ''))) / parseInt(item.originalPrice.replace(/[^0-9]/g, ''))) * 100)}%
                      </span>
                    )}
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className={`w-full py-3 px-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isInCart(item.id)
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-lg'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg'
                    }`}
                  >
                    {isInCart(item.id) ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        In Cart ({getItemQuantity(item.id)})
                      </span>
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100" data-animate id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-3 mb-6">
              <span className="text-green-600 text-sm font-semibold">⭐ Why Choose Us</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Shopping Experience</h2>
            <p className="text-xl text-gray-600">Exceptional service that sets us apart</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚚",
                title: "Free Premium Delivery",
                description: "Complimentary delivery on orders over ₹41,500 with white-glove service",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                description: "Bank-grade security with multiple payment options and buyer protection",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: "↩️",
                title: "Hassle-Free Returns",
                description: "30-day return policy with free pickup and full refund guarantee",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 ${
                  isVisible.features ? `animate-fade-in-up delay-${index * 200}` : 'opacity-0'
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Furniture CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-400/5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-400/10 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-3 mb-8">
            <span className="text-amber-300 text-sm font-medium">🔨 Custom Solutions</span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
            Need Custom Furniture?
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Can't find what you're looking for? Our expert carpenters can create custom pieces just for you. 
            From concept to creation, we bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/contact"
              state={{ bookProfessional: true }}
              className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block"
            >
              <span className="relative z-10">Book Expert Carpenter</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
            </Link>
            
            <Link 
              to="/contact"
              state={{ bookProfessional: true }}
              className="group border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 inline-block"
            >
              Get Custom Quote
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '100+', label: 'Custom Projects' },
              { number: '50+', label: 'Expert Craftsmen' },
              { number: '1+', label: 'Years Experience' },
              { number: '99.99%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-amber-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Cart Summary */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-2xl shadow-2xl z-50">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🛒</span>
            <div>
              <div className="font-bold">Cart ({getTotalItems()})</div>
              <div className="text-sm opacity-90">
                Items in cart
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔐</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Login Required
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Please log in to add items to your cart and continue shopping.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleLoginPrompt('login')}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Go to Login
                </button>
                
                <button
                  onClick={() => handleLoginPrompt('cancel')}
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;