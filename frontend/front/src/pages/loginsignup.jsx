import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpg";

const LoginSignup = () => {
  const location = useLocation();
  // If navigated here with state.signup === true, open the Sign Up tab
  console.log("LoginSignup component - location.state:", location.state);
  const [isLogin, setIsLogin] = useState(
    !(location.state && location.state.signup)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || "/";
  const wasRedirected = location.state?.from;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Handle login
        if (!formData.email || !formData.password) {
          setError("Please fill in all required fields");
          return;
        }

        const result = await login(formData.email, formData.password);
        if (result.success) {
          navigate(from, { replace: true });
        } else {
          setError(
            result.error || "Login failed. Please check your credentials."
          );
        }
      } else {
        // Handle signup
        if (
          !formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          setError("Please fill in all required fields");
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long");
          return;
        }

        const result = await signup(
          formData.name,
          formData.email,
          formData.password
        );
        if (result.success) {
          navigate(from, { replace: true });
        } else {
          setError(result.error || "Signup failed. Please try again.");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-2xl">
                <img
                  src={logo}
                  alt="Build Bazaar X Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Build
                </span>
                <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Bazaar
                </span>
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  X
                </span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back!" : "Join BuildBazaarX"}
            </h2>
            <p className="text-lg text-gray-300">
              {isLogin
                ? "Sign in to your account"
                : "Create your account to get started"}
            </p>
            {wasRedirected && (
              <div className="mt-6 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 text-blue-200 px-6 py-4 rounded-xl backdrop-blur-sm">
                <p className="text-sm flex items-center">
                  <span className="text-lg mr-2">🔒</span>
                  Please log in to access the{" "}
                  <strong className="text-blue-100">
                    {from === "/marketplace"
                      ? "Marketplace"
                      : from === "/professionals"
                      ? "Carpenters"
                      : "protected page"}
                  </strong>
                </p>
              </div>
            )}
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1 shadow-2xl border border-white/20">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isLogin
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !isLogin
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 text-red-200 px-6 py-4 rounded-xl backdrop-blur-sm animate-pulse">
              <div className="flex items-center">
                <span className="text-lg mr-2">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20">
              {!isLogin && (
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-white"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-white"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="Confirm your password"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-white/30 rounded bg-white/10"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-white"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-2xl text-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="mr-2">{isLogin ? "🔑" : "✨"}</span>
                    {isLogin ? "Sign In" : "Create Account"}
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-gray-300 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-lg bg-white/10 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-lg bg-white/10 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Why Join BuildBazaarX?
            </h3>
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-200 group-hover:text-white transition-colors">
                  Access to exclusive furniture deals
                </span>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-200 group-hover:text-white transition-colors">
                  Book verified carpenters
                </span>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-200 group-hover:text-white transition-colors">
                  Track your orders and projects
                </span>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-200 group-hover:text-white transition-colors">
                  Get personalized recommendations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
