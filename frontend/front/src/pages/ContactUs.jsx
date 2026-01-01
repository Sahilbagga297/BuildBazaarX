import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import contactusImg from '../assets/contactus.png';
import { contactAPI } from '../services/api.js';

const ContactUs = () => {
  const location = useLocation();
  const bookProfessionalFromState = location.state?.bookProfessional || false;
  
  const [formData, setFormData] = useState({
    // Basic contact details
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    // Professional booking checkbox
    bookProfessional: bookProfessionalFromState,
    // Professional booking fields (only shown when checkbox is checked)
    projectType: '',
    budget: '',
    timeline: '',
    location: '',
    projectDescription: '',
    preferredContactMethod: 'phone',
    urgency: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    
    // If professional booking is selected, validate additional fields
    if (formData.bookProfessional) {
      const professionalFields = ['projectType', 'budget', 'timeline', 'location', 'projectDescription'];
      const missingProfessionalFields = professionalFields.filter(field => !formData[field]);
      
      if (missingProfessionalFields.length > 0) {
        console.error('Missing professional booking fields:', missingProfessionalFields);
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }
    }
    
    try {
      // Call the backend API
      const result = await contactAPI.sendContactForm(formData);
      
      if (result.success) {
        console.log('Form submitted successfully:', result.data);
        setSubmitStatus('success');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          bookProfessional: bookProfessionalFromState,
          projectType: '',
          budget: '',
          timeline: '',
          location: '',
          projectDescription: '',
          preferredContactMethod: 'phone',
          urgency: 'medium'
        });
      } else {
        console.error('Form submission failed:', result.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    'Furniture Design & Manufacturing',
    'Kitchen Cabinet Installation',
    'Custom Woodwork',
    'Interior Design Consultation',
    'Furniture Repair & Restoration',
    'Office Space Design',
    'Bedroom Furniture Set',
    'Living Room Setup',
    'Other'
  ];

  const budgetRanges = [
    'Under ₹10,000',
    '₹10,000 - ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    'Above ₹2,50,000'
  ];

  const timelineOptions = [
    'ASAP (Within 1 week)',
    'Within 2 weeks',
    'Within 1 month',
    'Within 2-3 months',
    'Flexible timeline'
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
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
                  <span className="text-amber-300 text-sm font-medium">📞 Get In Touch</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                    Contact
                  </span>
                  <br />
                  <span className="text-amber-400">Us</span>
                </h1>
                
                <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto lg:mx-0 leading-relaxed">
                  Have questions? Need a custom quote? Want to book a professional? 
                  We're here to help you create your perfect space.
                </p>
              </div>
              
              <div className="relative">
                <div className="relative group">
                  <img 
                    src={contactusImg} 
                    alt="Contact Us - BuildBazaarX Professional Services" 
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

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 rounded-full px-6 py-3 mb-6">
              <span className="text-amber-600 text-sm font-semibold">💬 Let's Connect</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours. 
              Need professional services? Check the box and we'll show you additional options.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl">
                <div className="flex items-center">
                  <div className="text-green-600 text-2xl mr-4">✅</div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Message Sent Successfully!</h3>
                    <p className="text-green-600">We'll get back to you within 24 hours.</p>
                    <p className="text-green-500 text-sm mt-2">
                      📧 Confirmation emails have been sent to your email address.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isSubmitting && (
              <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-4"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">Sending Message...</h3>
                    <p className="text-blue-600">Please wait while we process your request.</p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl">
                <div className="flex items-center">
                  <div className="text-red-600 text-2xl mr-4">❌</div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">Error Sending Message</h3>
                    <p className="text-red-600">Please try again or contact us directly.</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Professional Booking Checkbox */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    id="bookProfessional"
                    name="bookProfessional"
                    checked={formData.bookProfessional}
                    onChange={handleInputChange}
                    className="mt-1 w-6 h-6 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                  />
                  <div>
                    <label htmlFor="bookProfessional" className="text-lg font-semibold text-gray-900 cursor-pointer">
                      🛠️ I want to book a professional for my project
                    </label>
                    <p className="text-gray-600 mt-2">
                      Check this box if you need professional services like custom furniture, 
                      woodwork, interior design, or installation services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic Contact Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Professional Booking Fields - Only shown when checkbox is checked */}
              {formData.bookProfessional && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional Booking Details</h3>
                    <p className="text-gray-600">Help us understand your project better</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                        Budget Range *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range, index) => (
                          <option key={index} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-2">
                        Project Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2">
                        Urgency Level
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="low">Low - No rush</option>
                        <option value="medium">Medium - Normal timeline</option>
                        <option value="high">High - Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="City, State (e.g., Mumbai, Maharashtra)"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                      Detailed Project Description *
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="Describe your project in detail. Include dimensions, materials, style preferences, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Preferred Contact Method
                    </label>
                    <div className="flex space-x-6">
                      {[
                        { value: 'phone', label: 'Phone Call', icon: '📞' },
                        { value: 'email', label: 'Email', icon: '📧' },
                        { value: 'whatsapp', label: 'WhatsApp', icon: '💬' }
                      ].map((method) => (
                        <label key={method.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContactMethod"
                            value={method.value}
                            checked={formData.preferredContactMethod === method.value}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {method.icon} {method.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Send Message</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-3 mb-8">
              <span className="text-amber-300 text-sm font-medium">📍 Other Ways to Reach Us</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Prefer to reach out directly? Here are other ways to contact us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Phone</h3>
              <p className="text-gray-300 mb-2">+91 9521259456</p>
              <p className="text-gray-400 text-sm">Mon-Fri 9AM-6PM</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📧</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Email</h3>
              <p className="text-gray-300 mb-2">info@buildbazaax.com</p>
              <p className="text-gray-400 text-sm">24/7 Support</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Office</h3>
              <p className="text-gray-300 mb-2">Jaipur, Rajasthan</p>
              <p className="text-gray-400 text-sm">Visit by appointment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-gray-900 mb-8">
            Ready to Start Your Project?
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Don't wait! Get in touch with us today and let's bring your vision to life 
            with quality furniture and expert craftsmanship.
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
              to="/professionals"
              className="group border-2 border-amber-400 bg-amber-400/10 backdrop-blur-sm text-amber-600 hover:bg-amber-400 hover:text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 inline-block"
            >
              View Professionals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
