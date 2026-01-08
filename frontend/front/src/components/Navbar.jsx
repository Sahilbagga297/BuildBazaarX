import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const { user, logout, isAuthenticated: isAuth, warningShown } = useAuth(); // <-- ensure boolean
  const isAuthenticated = Boolean(isAuth);
  const { getTotalItems } = useCart();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    // Dev debug log to help trace clicks when dropdown won't open in browser
    if (typeof window !== 'undefined' && import.meta.env?.DEV) {
      // eslint-disable-next-line no-console
      console.log('Navbar: toggleDropdown called. prev=', isDropdownOpen);
    }
    setIsDropdownOpen((prev) => !prev);
    setFocusedIndex(-1);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setFocusedIndex(-1);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isDropdownOpen) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleDropdown();
      }
      return;
    }

    const menuItems = dropdownRef.current?.querySelectorAll("a, button");
    const totalItems = menuItems?.length || 0;

    switch (e.key) {
      case "Escape":
        closeDropdown();
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % totalItems);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + totalItems) % totalItems);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0 && menuItems?.[focusedIndex]) {
          menuItems[focusedIndex].click();
        }
        break;
    }
  };

  // Focus management
  useEffect(() => {
    if (isDropdownOpen && focusedIndex >= 0) {
      const menuItems = dropdownRef.current?.querySelectorAll("a, button");
      menuItems?.[focusedIndex]?.focus();
    }
  }, [focusedIndex, isDropdownOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl sticky top-0 z-50 relative overflow-visible">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-500/10 to-orange-500/10"></div>
        <div className="absolute top-2 right-8 w-16 h-16 border border-amber-400/20 rounded-full"></div>
        <div className="absolute bottom-2 left-8 w-12 h-12 border border-orange-400/20 rounded-lg rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <img
                src={logo}
                alt="Build Bazaar X Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Build
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Bazaar
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                X
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 font-medium text-lg hover:scale-105"
            >
              Home
            </Link>
            <Link
              to="/marketplace"
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 font-medium text-lg hover:scale-105"
            >
              Marketplace
            </Link>
            {isAuthenticated && (
              <Link
                to="/professionals"
                className="text-gray-300 hover:text-amber-400 transition-all duration-300 font-medium text-lg hover:scale-105"
              >
                Professionals
              </Link>
            )}
            <Link
              to="/about"
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 font-medium text-lg hover:scale-105"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 font-medium text-lg hover:scale-105"
            >
              Contact
            </Link>
          </div>

          {/* Cart Icon */}
          {isAuthenticated && (
            <Link
              to="/cart"
              className="relative p-3 text-gray-300 hover:text-amber-400 transition-all duration-300 hover:scale-110"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
              </div>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                  {getTotalItems() > 99 ? "99+" : getTotalItems()}
                </span>
              )}
            </Link>
          )}

          {/* Auth Section - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative z-[9999]">
                <button
                  ref={buttonRef}
                  onClick={toggleDropdown}
                  onKeyDown={handleKeyDown}
                  className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-all duration-300 hover:scale-105 focus:outline-none rounded-xl p-2"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="menu"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">
                      {user?.name ? String(user.name).charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-semibold text-lg">{user?.name || 'User'}</div>
                    <div className="text-sm text-gray-400">Welcome back!</div>
                    {warningShown && (
                      <div className="text-xs text-red-400 animate-pulse mt-1">
                        ⚠️ Session expires in 1 day!
                      </div>
                    )}
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-3 w-56 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl py-2 border border-slate-700 z-[9999]"
                    role="menu"
                  >
                    <div className="px-6 py-4 text-sm text-gray-300 border-b border-slate-700">
                      <div className="font-semibold text-lg text-white">
                        {user?.name || 'User'}
                      </div>
                      <div className="text-gray-400">{user?.email || ''}</div>
                      {warningShown && (
                        <div className="text-xs text-red-400 animate-pulse mt-2 flex items-center">
                          <span className="mr-1">⚠️</span>
                          Session expires in 1 day!
                        </div>
                      )}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-6 py-3 text-sm text-gray-300 hover:bg-slate-700 transition-all"
                      role="menuitem"
                      onClick={closeDropdown}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-6 py-3 text-sm text-gray-300 hover:bg-slate-700 transition-all"
                      role="menuitem"
                      onClick={closeDropdown}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-6 py-3 text-sm text-gray-300 hover:bg-slate-700 transition-all"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Login / Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-300 hover:text-amber-400 p-2 rounded-xl hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isDropdownOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isDropdownOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900 shadow-xl border-t border-slate-800 z-40">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md">Home</Link>
              <Link to="/marketplace" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md">Marketplace</Link>
              {isAuthenticated && (
                <Link to="/professionals" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md">Professionals</Link>
              )}
              <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md">About</Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md">Contact</Link>

              <div className="pt-4 border-t border-slate-700">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {user?.name ? String(user.name).charAt(0).toUpperCase() : "U"}
                        </span>
                      </div>
                      <span className="text-gray-300">{user?.name}</span>
                    </div>
                    <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md">Profile</Link>
                    <Link to="/orders" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md">My Orders</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-md">Logout</button>
                  </div>
                ) : (
                  <Link to="/login" className="block w-full text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all">
                    Login / Signup
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
