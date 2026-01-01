import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const [warningShown, setWarningShown] = useState(false);

  // Session timeout duration (10 days)
  const SESSION_TIMEOUT = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
  const WARNING_TIME = 24 * 60 * 60 * 1000; // Show warning 1 day before timeout

  // Activity tracking and session management
  const resetSessionTimeout = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    
    const timeout = setTimeout(() => {
      handleSessionTimeout();
    }, SESSION_TIMEOUT);
    
    setSessionTimeout(timeout);
    
    // Show warning 2 minutes before timeout
    const warningTimeout = setTimeout(() => {
      if (user && !warningShown) {
        showSessionWarning();
      }
    }, SESSION_TIMEOUT - WARNING_TIME);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(warningTimeout);
    };
  };

  const handleSessionTimeout = () => {
    logout();
    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Session Expired', {
        body: 'Your session has expired due to inactivity. Please log in again.',
        icon: '/favicon.ico'
      });
    }
  };

  const showSessionWarning = () => {
    setWarningShown(true);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Session Warning', {
        body: 'Your session will expire in 1 day due to inactivity.',
        icon: '/favicon.ico'
      });
    }
    
    // Show browser alert as fallback
    alert('Your session will expire in 1 day due to inactivity. Please interact with the page to extend your session.');
  };

  // Activity event handlers
  const handleUserActivity = () => {
    if (user) {
      resetSessionTimeout();
      setWarningShown(false);
    }
  };

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('buildbazaax_token');
      const savedUser = localStorage.getItem('buildbazaax_user');
      
      if (token && savedUser) {
        try {
          // Verify token with backend (optional - you can skip this for now)
          // const result = await authAPI.verifyToken();
          // if (result.success) {
            setUser(JSON.parse(savedUser));
          // } else {
          //   localStorage.removeItem('buildbazaax_token');
          //   localStorage.removeItem('buildbazaax_user');
          // }
        } catch (error) {
          // If token verification fails, clear storage
          localStorage.removeItem('buildbazaax_token');
          localStorage.removeItem('buildbazaax_user');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Set up activity tracking when user logs in
  useEffect(() => {
    if (user) {
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
      
      // Set up activity listeners
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      events.forEach(event => {
        document.addEventListener(event, handleUserActivity, true);
      });
      
      // Start session timeout
      resetSessionTimeout();
      
      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleUserActivity, true);
        });
        if (sessionTimeout) {
          clearTimeout(sessionTimeout);
        }
      };
    }
  }, [user]);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const result = await authAPI.login({ email, password });
      
      if (result.success) {
        const { token } = result.data;
        
        // Store token
        localStorage.setItem('buildbazaax_token', token);
        
        // Fetch user profile from backend
        try {
          const profileResult = await authAPI.getProfile();
          if (profileResult.success) {
            setUser(profileResult.data);
            localStorage.setItem('buildbazaax_user', JSON.stringify(profileResult.data));
          } else {
            // Fallback to basic user data if profile fetch fails
            const userData = {
              id: Date.now(),
              name: email.split('@')[0] || 'User',
              email: email,
              role: 'customer'
            };
            setUser(userData);
            localStorage.setItem('buildbazaax_user', JSON.stringify(userData));
          }
        } catch (error) {
          // Fallback to basic user data if profile fetch fails
          const userData = {
            id: Date.now(),
            name: email.split('@')[0] || 'User',
            email: email,
            role: 'customer'
          };
          setUser(userData);
          localStorage.setItem('buildbazaax_user', JSON.stringify(userData));
        }
        
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      
      const result = await authAPI.register({ name, email, password });
      
      if (result.success) {
        const { token } = result.data;
        
        // Store token
        localStorage.setItem('buildbazaax_token', token);
        
        // Fetch user profile from backend
        try {
          const profileResult = await authAPI.getProfile();
          if (profileResult.success) {
            setUser(profileResult.data);
            localStorage.setItem('buildbazaax_user', JSON.stringify(profileResult.data));
          } else {
            // Fallback to basic user data if profile fetch fails
            const userData = {
              id: Date.now(),
              name: name,
              email: email,
              role: 'customer'
            };
            setUser(userData);
            localStorage.setItem('buildbazaax_user', JSON.stringify(userData));
          }
        } catch (error) {
          // Fallback to basic user data if profile fetch fails
          const userData = {
            id: Date.now(),
            name: name,
            email: email,
            role: 'customer'
          };
          setUser(userData);
          localStorage.setItem('buildbazaax_user', JSON.stringify(userData));
        }
        
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call backend logout endpoint (optional)
      await authAPI.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.log('Logout API call failed:', error);
    } finally {
      // Clear session timeout
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
        setSessionTimeout(null);
      }
      setWarningShown(false);
      
      // Clear local storage and state
      setUser(null);
      localStorage.removeItem('buildbazaax_token');
      localStorage.removeItem('buildbazaax_user');
    }
  };

  // Update user function
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('buildbazaax_user', JSON.stringify(userData));
  };

  // Check if user is authenticated
  const isAuthenticated = user !== null;

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated,
    loading,
    sessionTimeout,
    warningShown
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
