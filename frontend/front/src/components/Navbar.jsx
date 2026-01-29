import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const { user, logout, isAuthenticated: isAuth, warningShown } = useAuth();
  const isAuthenticated = Boolean(isAuth);
  const { getTotalItems } = useCart();
  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileButtonRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileOpen &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }

      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen, isMobileMenuOpen]);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* NAVBAR ROW */}
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center">
              <span className="text-lg sm:text-2xl font-bold text-white">Build</span>
              <span className="text-lg sm:text-2xl font-bold text-amber-400 ml-1">Bazaar</span>
              <span className="text-lg sm:text-2xl font-bold text-orange-400 ml-1">X</span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            {["/", "/marketplace", "/about", "/contact"].map((path, i) => (
              <Link
                key={i}
                to={path}
                className="text-gray-300 hover:text-amber-400 transition font-medium text-lg"
              >
                {path === "/" ? "Home" : path.replace("/", "").replace(/^\w/, c => c.toUpperCase())}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/professionals"
                className="text-gray-300 hover:text-amber-400 transition font-medium text-lg"
              >
                Professionals
              </Link>
            )}
          </div>

          {/* DESKTOP CART */}
          {isAuthenticated && (
            <Link to="/cart" className="hidden md:block relative">
              <span className="text-gray-300 hover:text-amber-400">🛒</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          )}

          {/* DESKTOP AUTH */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  ref={profileButtonRef}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 text-gray-300 hover:text-amber-400"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span>{user?.name}</span>
                </button>

                {isProfileOpen && (
                  <div
                    ref={profileDropdownRef}
                    className="absolute right-0 mt-3 w-56 bg-slate-900 rounded-xl shadow-xl border border-slate-700"
                  >
                    <Link to="/profile" className="block px-4 py-3 hover:bg-slate-800">
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-3 hover:bg-slate-800">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-slate-800 text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold"
              >
                Login / Signup
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            ref={mobileButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-amber-400"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed top-16 left-0 w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-slate-900/95 backdrop-blur-lg border-t border-slate-700"
        >
          <div className="px-4 py-4 space-y-2">
            {["/", "/marketplace", "/about", "/contact"].map((path, i) => (
              <Link
                key={i}
                to={path}
                className="block px-4 py-4 rounded-xl text-gray-100 hover:bg-slate-800"
              >
                {path === "/" ? "Home" : path.replace("/", "").replace(/^\w/, c => c.toUpperCase())}
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <Link to="/cart" className="block px-4 py-4 rounded-xl hover:bg-slate-800">
                  Cart ({getTotalItems()})
                </Link>
                <Link to="/profile" className="block px-4 py-4 rounded-xl hover:bg-slate-800">
                  Profile
                </Link>
                <Link to="/orders" className="block px-4 py-4 rounded-xl hover:bg-slate-800">
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-4 text-red-400 hover:bg-red-500/10 rounded-xl"
                >
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <Link
                to="/login"
                className="block text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-xl font-bold"
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
