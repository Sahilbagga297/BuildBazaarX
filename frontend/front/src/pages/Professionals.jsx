import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import carpentryImg from '../assets/carpentry.jpg';
import interiordesigningImg from '../assets/interiordesigning.jpg';
import contactusimg from '../assets/contactusimg.png';
import homeconsultationimg from '../assets/homeconsultationimg.png';
import professionalsHeroImg from '../assets/professionals.png';

const Professionals = () => {

  const services = [
    {
      id: 1,
      title: "Upgrade your space with exclusive carpentry services.",
      description: "We specialize in custom furniture and woodwork for homes and offices. From new kitchens, table, office and kitchen",
      image: "🔨",
      category: "Carpentry"
    },
    {
      id: 2,
      title: "Redefine your space with our premium interior design services.",
      description: "Create stunning interiors with our expert designers. From modular kitchens to complete home renovations, we deliver exceptional results.",
      image: "🏠",
      category: "Interior Design"
    }
  ];

  const processSteps = [
    { id: 1, title: "Contact Us", image: "📋" },
    { id: 2, title: "Consultation at Your Home", image: "🏡" },
    { id: 3, title: "Work Starts", image: "🔨" },
    { id: 4, title: "Work Delivered", image: "✅" }
  ];


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
                  <span className="text-amber-300 text-sm font-medium">🔨 Professional Team</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                    Professional
                  </span>
                  <br />
                  <span className="text-amber-400">Team</span>
                </h1>
                
                <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto lg:mx-0 leading-relaxed">
                  Expert craftsmen and designers at your service. Transform your space with our professional team.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <Link 
                    to="/contact"
                    state={{ bookProfessional: true }}
                    className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    <span className="relative z-10">Book Consultation</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative group">
                  <img 
                    src={professionalsHeroImg} 
                    alt="Professional Team - Expert Craftsmen and Designers" 
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


      {/* Our Professional Services */}
      <section id="professional-services" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-orange-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6">
              <span className="text-blue-600 text-sm font-semibold">🔨 Our Services</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Services</h2>
            <p className="text-xl text-gray-600">Expert solutions for every aspect of your project</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <div key={service.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden">
                {/* Service Image */}
                <div className="relative p-8 bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-amber-50 group-hover:to-orange-50 transition-all duration-500">
                  <div className="w-full h-48 mb-4 transform group-hover:scale-110 transition-transform duration-500 rounded-lg overflow-hidden">
                    <img 
                      src={service.id === 1 
                        ? carpentryImg
                        : interiordesigningImg
                      }
                      alt={service.category}
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>
                  
                  {/* Service Icon */}
                  <div className="absolute top-4 left-4 bg-white rounded-full p-3 shadow-lg">
                    <span className="text-2xl">{service.image}</span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Service Info */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  
                  <Link 
                    to="/contact"
                    state={{ bookProfessional: true }}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Dream Home in 4 Steps */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/30 to-orange-50/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-3 mb-6">
              <span className="text-green-600 text-sm font-semibold">⭐ Our Process</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Dream Home in 4 Steps!</h2>
            <p className="text-xl text-gray-600">Simple, transparent process from consultation to completion</p>
          </div>
          
          {/* Step Icons */}
          <div className="flex justify-center items-center mb-16 space-x-8 overflow-x-auto">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center min-w-max group">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">{step.image}</span>
                </div>
                <span className="text-sm font-medium text-gray-900 text-center group-hover:text-amber-600 transition-colors">{step.title}</span>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-8 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>

          {/* Detailed Steps */}
          <div className="grid md:grid-cols-2 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img
                    className="w-full h-48 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-500"
                    src={step.id === 1 
                      ? contactusimg
                      : step.id === 2 
                      ? homeconsultationimg
                      : step.id === 3 
                      ? carpentryImg
                      : interiordesigningImg
                    }
                    alt={step.title}
                  />
                  <div className="absolute top-4 left-4 bg-white rounded-full p-3 shadow-lg">
                    <span className="text-2xl">{step.image}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.id === 1 && "Contact us through our contact page with your project details and requirements."}
                    {step.id === 2 && "Our expert will visit your home to assess the space and provide personalized recommendations."}
                    {step.id === 3 && "Once you approve the plan and quote, our skilled professionals begin the work."}
                    {step.id === 4 && "Your project is completed on time with quality assurance and final walkthrough."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Professionals;
