import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPriceFormatted
  } = useCart();
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Step control
  const [step, setStep] = useState(1);

  // Address form state
  const [addressForm, setAddressForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || ''
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({});

  // Handle input change with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    const { name, phone, address, city, state, zipCode } = addressForm;
    
    if (!name.trim()) errors.name = 'Name is required';
    if (!phone.trim()) errors.phone = 'Phone number is required';
    if (!address.trim()) errors.address = 'Address is required';
    if (!city.trim()) errors.city = 'City is required';
    if (!state.trim()) errors.state = 'State is required';
    if (!zipCode.trim()) errors.zipCode = 'Zip code is required';
    
    // Phone validation
    if (phone && !/^[0-9]{10}$/.test(phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Proceed to Payment Step
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(2);
    }
  };

  // Checkout & Place Order
  const handleCheckout = async () => {
    if (!user) {
      alert('Please log in to proceed with checkout');
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    setCheckoutMessage('');

    try {
      const orderData = {
        items: cartItems,
        shippingAddress: addressForm,
        paymentMethod: 'cash_on_delivery',
        notes: ''
      };

      const result = await ordersAPI.createOrder(orderData);

      if (result.success) {
        clearCart();
        setShowAnimation(true);
        setOrderDetails(result.data.order);
        setShowOrderConfirmation(true);

        if ('vibrate' in navigator) navigator.vibrate([100,50,100]);
        setCheckoutMessage('✅ Order placed successfully! You can view it in "My Orders" section.');

        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Order Placed Successfully! 🎉', {
            body: `Your order ${result.data.order?.orderNumber || 'has been placed'} will appear in "My Orders"`,
            icon: '/favicon.ico'
          });
        }

        // Auto-hide confirmation animation after 3 seconds
        setTimeout(() => {
          setShowOrderConfirmation(false);
          setShowAnimation(false);
        }, 3000);
        
        setTimeout(() => setCheckoutMessage(''), 10000);
        setStep(1);
      } else {
        setCheckoutMessage(`❌ Failed to create order: ${result.error}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutMessage('An error occurred during checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      setRemovingItem(itemId);
      setTimeout(() => {
        removeFromCart(itemId);
        setRemovingItem(null);
      }, 300);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    setRemovingItem(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItem(null);
    }, 300);
  };

  if (cartItems.length === 0 && !showAnimation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounce text-8xl mb-8">🛒</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Start exploring our amazing products!
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
              <p className="text-lg text-gray-600">{cartItems.length} item(s) in your cart</p>
            </div>
            <Link
              to="/marketplace"
              className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm border"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`p-6 transition-all duration-300 ${
                      removingItem === item.id 
                        ? 'opacity-0 transform scale-95' 
                        : 'opacity-100 transform scale-100'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                          <p className="text-amber-600 font-bold text-xl">₹{parseFloat(item.price.replace(/[₹$,]/g, '')).toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-gray-50 rounded-lg p-1">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary / Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h2>
              
              {/* Order Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span className="font-medium">{getTotalPriceFormatted()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <hr className="border-gray-200"/>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-amber-600">{getTotalPriceFormatted()}</span>
                </div>
              </div>

              {/* Checkout Message */}
              {checkoutMessage && (
                <div className={`mb-6 p-4 rounded-xl ${
                  checkoutMessage.includes('✅') 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {checkoutMessage}
                </div>
              )}

              {/* Step Indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center ${step >= 1 ? 'text-amber-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= 1 ? 'bg-amber-600 text-white' : 'bg-gray-200'
                    }`}>
                      1
                    </div>
                    <span className="ml-2 text-sm font-medium">Address</span>
                  </div>
                  <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
                  <div className={`flex items-center ${step >= 2 ? 'text-amber-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= 2 ? 'bg-amber-600 text-white' : 'bg-gray-200'
                    }`}>
                      2
                    </div>
                    <span className="ml-2 text-sm font-medium">Payment</span>
                  </div>
                </div>
              </div>

              {/* Step 1: Address Form */}
              {step === 1 && (
                <form className="space-y-4" onSubmit={handleAddressSubmit}>
                  <div>
                    <input 
                      name="name" 
                      placeholder="Full Name" 
                      value={addressForm.name} 
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                        formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <input 
                      name="phone" 
                      placeholder="Phone Number" 
                      value={addressForm.phone} 
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                        formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                  
                  <div>
                    <input 
                      name="address" 
                      placeholder="Street Address" 
                      value={addressForm.address} 
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                        formErrors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input 
                        name="city" 
                        placeholder="City" 
                        value={addressForm.city} 
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                          formErrors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
                    </div>
                    
                    <div>
                      <input 
                        name="state" 
                        placeholder="State" 
                        value={addressForm.state} 
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                          formErrors.state ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.state && <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <input 
                      name="zipCode" 
                      placeholder="ZIP Code" 
                      value={addressForm.zipCode} 
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                        formErrors.zipCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.zipCode && <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Proceed to Payment
                  </button>
                </form>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Cash on Delivery</h3>
                        <p className="text-sm text-gray-600">Pay when your order arrives</p>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout} 
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      'Place Order - Cash on Delivery'
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setStep(1)}
                    className="w-full text-gray-600 hover:text-gray-800 py-2 transition-colors duration-200"
                  >
                    ← Back to Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Animation */}
      {showOrderConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          {/* Light Celebration Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${30 + (i % 2) * 20}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              >
                <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-70"></div>
              </div>
            ))}
          </div>

          {/* Success Icon */}
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-success-bounce shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Subtle Ripple Effect */}
            <div className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full animate-ripple opacity-30"></div>
            
            {/* Success Message */}
            <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
              <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">Order Placed Successfully!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
