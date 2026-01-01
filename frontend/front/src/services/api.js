import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://buildbazaarx.onrender.com/api',
  timeout: 70000, // Increased timeout to 30 seconds for email operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('buildbazaax_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('buildbazaax_token');
      localStorage.removeItem('buildbazaax_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/users/logout');
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Logout failed',
      };
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch profile',
      };
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update profile',
      };
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await api.get('/users/verify');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Token verification failed',
      };
    }
  },
};

// Orders API functions
export const ordersAPI = {
  // Create a new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create order',
      };
    }
  },

  // Get user orders
  getOrders: async () => {
    try {
      const response = await api.get('/orders');
      return {
        success: true,
        data: response.data.data, // Backend returns { success: true, data: orders }
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch orders',
      };
    }
  },

  // Get single order details
  getOrder: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch order details',
      };
    }
  },

  // Track order
  trackOrder: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/track`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to track order',
      };
    }
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    try {
      const response = await api.put(`/orders/${orderId}/cancel`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to cancel order',
      };
    }
  },
};

// Furniture/Marketplace API functions (for future expansion)
export const marketplaceAPI = {
  // Get all furniture items
  getFurniture: async () => {
    try {
      const response = await api.get('/furniture');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch furniture',
      };
    }
  },

  // Get furniture by category
  getFurnitureByCategory: async (category) => {
    try {
      const response = await api.get(`/furniture/category/${category}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch furniture by category',
      };
    }
  },
};

// Professionals/Carpenters API functions (for future expansion)
export const professionalsAPI = {
  // Get all carpenters
  getCarpenters: async () => {
    try {
      const response = await api.get('/carpenters');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch carpenters',
      };
    }
  },

  // Book a carpenter
  bookCarpenter: async (bookingData) => {
    try {
      const response = await api.post('/carpenters/book', bookingData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to book carpenter',
      };
    }
  },
};

// Contact API functions
export const contactAPI = {
  // Send contact form
  sendContactForm: async (formData) => {
    try {
      const response = await api.post('/contact', formData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Contact API error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to send contact form',
      };
    }
  },

  // Get contact statistics (admin only)
  getContactStats: async () => {
    try {
      const response = await api.get('/contact/stats');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch contact statistics',
      };
    }
  },
};

export default api;
