import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const result = await ordersAPI.getOrders();
      
      if (result.success) {
        // Transform the data to match the expected format
        const transformedOrders = result.data.map(order => ({
          id: order.orderNumber,
          _id: order._id,
          date: order.createdAt,
          status: order.status,
          total: order.totalAmount,
          items: order.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          shippingAddress: order.shippingAddress,
          paymentMethod: order.paymentMethod,
          trackingNumber: order.trackingNumber
        }));
        setOrders(transformedOrders);
      } else {
        console.error('Failed to fetch orders:', result.error);
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Refresh orders when page becomes visible (e.g., when navigating back from cart)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchOrders();
      }
    };

    // Also refresh when the page is focused (e.g., switching tabs)
    const handleFocus = () => {
      fetchOrders();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'processing':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'shipped':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleTrackOrder = async (orderId) => {
    try {
      // Find the order to get the MongoDB _id
      const order = orders.find(o => o.id === orderId);
      if (!order) {
        alert('Order not found');
        return;
      }

      const result = await ordersAPI.trackOrder(order._id);
      if (result.success) {
        // Format tracking information for display
        const trackingInfo = result.data;
        const trackingHistory = trackingInfo.trackingHistory.map(entry => 
          `${entry.status}: ${entry.description} (${new Date(entry.timestamp).toLocaleDateString()})`
        ).join('\n');
        
        alert(`Order ${orderId} Tracking Information:\n\nStatus: ${trackingInfo.status}\nTracking Number: ${trackingInfo.trackingNumber || 'Not available'}\nEstimated Delivery: ${new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}\n\nTracking History:\n${trackingHistory}`);
      } else {
        alert(`Failed to track order: ${result.error}`);
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      alert('Failed to track order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">My Orders</h1>
            <p className="text-xl text-gray-300 mb-6">Track and manage your furniture orders</p>
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Orders
                </>
              )}
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            <div className="flex flex-wrap gap-4">
              {[
                { key: 'all', label: 'All Orders', count: orders.length, icon: '📦' },
                { key: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length, icon: '⏳' },
                { key: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length, icon: '🚚' },
                { key: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length, icon: '✅' }
              ].map(({ key, label, count, icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center ${
                    filter === key
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <span className="mr-2 text-lg">{icon}</span>
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl p-16 text-center border border-white/20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No orders found</h3>
              <p className="text-gray-300 mb-8 text-lg">
                {filter === 'all' 
                  ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                  : `No orders with status "${filter}" found.`
                }
              </p>
              {filter === 'all' && (
                <a
                  href="/marketplace"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <span className="mr-2">🛍️</span>
                  Start Shopping
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 group hover:bg-white/20 transition-all duration-300">
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm px-8 py-6 border-b border-white/20">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white">Order #{order.id}</h3>
                        <p className="text-gray-300 text-lg">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-4 sm:mt-0">
                        <span className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold border backdrop-blur-sm ${
                          order.status === 'completed' 
                            ? 'bg-green-500/20 text-green-200 border-green-400/30' 
                            : order.status === 'processing'
                            ? 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30'
                            : order.status === 'shipped'
                            ? 'bg-blue-500/20 text-blue-200 border-blue-400/30'
                            : 'bg-gray-500/20 text-gray-200 border-gray-400/30'
                        }`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-2 capitalize">{order.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-8">
                    <div className="space-y-6">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-6 border-b border-white/10 last:border-b-0 group/item">
                          <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                              <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white text-lg">{item.name}</h4>
                              <p className="text-gray-300">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-white text-xl">₹{item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold text-white">Total</span>
                        <span className="text-3xl font-bold text-white">₹{order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => handleTrackOrder(order.id)}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center"
                      >
                        <span className="mr-2">🚚</span>
                        Track Order
                      </button>
                      <button className="flex-1 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-300 backdrop-blur-sm">
                        View Details
                      </button>
                      {order.status === 'completed' && (
                        <button className="flex-1 border-2 border-green-500/50 text-green-400 px-8 py-4 rounded-xl font-semibold hover:bg-green-500/20 hover:text-green-300 transition-all duration-300 backdrop-blur-sm">
                          <span className="mr-2">🔄</span>
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
