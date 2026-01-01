import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Marketplace from './pages/Marketplace';
import LoginSignup from './pages/loginsignup';
import Professionals from './pages/Professionals';
import AboutPage from './pages/AboutPage';
import ContactUs from './pages/ContactUs';
import Cart from './pages/cart';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route 
                  path="/professionals" 
                  element={
                    <ProtectedRoute>
                      <Professionals />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
