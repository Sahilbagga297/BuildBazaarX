import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import about1 from '../assets/about1.png';
import about2 from '../assets/about2.png';
import about3 from '../assets/about3.png';
import about4 from '../assets/about4.png';
import about5 from '../assets/about5.png';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState({});

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

  const projectImages = [
    {
      category: "Living Room Designs",
      description: "Modern living spaces with premium furniture",
      placeholder: "🛋️ Living Room Gallery",
      image: about3
    },
    {
      category: "Kitchen Cabinets",
      description: "Custom kitchen solutions and woodwork",
      placeholder: "🍽️ Kitchen Gallery",
      image: about4
    },
    {
      category: "Bedroom Furniture",
      description: "Comfortable and stylish bedroom sets",
      placeholder: "🛏️ Bedroom Gallery",
      image: about5
    },
    {
      category: "Office Spaces",
      description: "Professional workspace furniture",
      placeholder: "💼 Office Gallery",
      image: about1
    }
  ];


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
                  <span className="text-amber-300 text-sm font-medium">🏗️ About Our Company</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                    About
                  </span>
                  <br />
                  <span className="text-amber-400">BuildBazaarX</span>
                </h1>
                
                <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto lg:mx-0 leading-relaxed">
                  Your trusted partner in creating beautiful, functional spaces with quality furniture and expert craftman.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <button 
                    onClick={() => scrollToSection('story')}
                    className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    <span className="relative z-10">Our Story</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative group">
                  <img 
                    src={about1} 
                    alt="BuildBazaarX - Quality Furniture and Woodwork" 
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
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white" data-animate id="story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible.story ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-flex items-center bg-amber-100 rounded-full px-4 py-2 mb-6">
                <span className="text-amber-600 text-sm font-semibold">📖 Our Journey</span>
              </div>
              
              <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Building Dreams, One Space at a Time
              </h2>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                BuildBazaarX was born from a simple vision: to make quality furniture and woodwork accessible to everyone. 
                We understand that your home is more than just a place to live – it's where memories are made and dreams are realized.
              </p>
              
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our platform brings together the best of both worlds – ready-made furniture for immediate needs and 
                custom craftsmanship for unique requirements. We've connected thousands of customers with skilled professionals 
                and quality materials, making every home improvement project a success.
              </p>
              
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-8">
                <p className="text-amber-800 font-semibold text-xl italic">
                  "Every piece of furniture tells a story. We help you create yours."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">1000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">2024</div>
                  <div className="text-gray-600">Year Founded</div>
                </div>
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible.story ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="relative">
                <div className="relative group">
                  <img 
                    src={about2} 
                    alt="BuildBazaarX Story - Quality Furniture and Craftsmanship" 
                    className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent rounded-3xl"></div>
                  
                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <div className="text-4xl mb-4">🏠</div>
                      <h3 className="text-2xl font-bold text-white mb-3">Founded in 2024</h3>
                      <p className="text-amber-100 text-sm leading-relaxed">
                        Started with a mission to revolutionize the furniture and woodwork industry through technology and quality service.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-300 rounded-full opacity-40 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section className="py-20 bg-white" data-animate id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 rounded-full px-6 py-3 mb-6">
              <span className="text-amber-600 text-sm font-semibold">🖼️ Our Work</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Project Gallery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse portfolio of furniture and woodwork projects that showcase our commitment to quality and craftsmanship.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectImages.map((project, index) => (
              <div key={index} className={`transform transition-all duration-700 delay-${index * 100} ${isVisible.gallery ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <div className="group relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.category}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    
                    {/* Category Icon Overlay */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <span className="text-2xl">{project.placeholder.split(' ')[0]}</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{project.category}</h3>
                    <p className="text-sm opacity-90">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100" data-animate id="mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6">
              <span className="text-blue-600 text-sm font-semibold">🎯 Our Purpose</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Mission & Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                description: "To provide a seamless platform where customers can find quality furniture, materials, and skilled professionals to transform their living spaces.",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                icon: "💎",
                title: "Quality First",
                description: "We never compromise on quality. Every product and service is carefully vetted to ensure our customers receive the best value for their investment.",
                gradient: "from-amber-500 to-orange-500"
              },
              {
                icon: "🤝",
                title: "Customer Focus",
                description: "Your satisfaction is our priority. We're committed to providing exceptional service and support throughout your journey with us.",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((value, index) => (
              <div key={index} className={`transform transition-all duration-700 delay-${index * 200} ${isVisible.mission ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-400/5 rounded-full animate-bounce"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-3 mb-8">
            <span className="text-amber-300 text-sm font-medium">🚀 Start Your Journey</span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
            Ready to Start Your Project?
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let us help you create the perfect space with quality furniture and expert craftsmanship. 
            Your dream home is just one click away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/marketplace"
              className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block"
            >
              <span className="relative z-10">Browse Marketplace</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
            </Link>
            
            <Link 
              to="/contact"
              className="group border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 inline-block"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;