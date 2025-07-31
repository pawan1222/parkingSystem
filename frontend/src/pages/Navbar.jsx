import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Car, Menu, X, Home, MapPin, Plus, Eye, Settings, LogIn, UserPlus, LogOut, User, Shield } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = async () => {
    try {
      await axios("http://localhost:4000/api/user/logout", {
        withCredentials: true,
      });
      setUser(null); // clear user from context
      navigate("/login");
    } catch (error) {
      console.log(error.response?.msg || error.message);
    }
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home, public: true },
    { to: "/lotsByCity", label: "Lots", icon: MapPin, public: true },
  ];

  const adminLinks = [
    { to: "/addLot", label: "Add Lot", icon: Plus },
    { to: "/viewLot", label: "View Lot", icon: Eye },
    { to: "/manage", label: "Manage", icon: Settings },
  ];

  const authLinks = [
    { to: "/login", label: "Login", icon: LogIn },
    { to: "/register", label: "Register", icon: UserPlus },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#14213d]/95 backdrop-blur-lg shadow-2xl shadow-black/20' 
            : 'bg-gradient-to-r from-[#14213d] to-black/90'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="p-2 bg-[#fca311] rounded-xl group-hover:rotate-12 transition-transform duration-300">
                  <Car className="w-6 h-6 text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#fca311] rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white group-hover:text-[#fca311] transition-colors duration-300">
                  Smart Parking
                </h1>
                <div className="text-xs text-[#e5e5e5] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Find. Book. Park.
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              
              {/* Public Links */}
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group flex items-center space-x-2 px-4 py-2 rounded-xl text-[#e5e5e5] hover:text-white hover:bg-[#fca311]/10 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}

              {/* Admin Links */}
              {user?.role === "admin" && (
                <div className="flex items-center space-x-1 ml-2 pl-2 border-l border-[#fca311]/20">
                  {adminLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="group flex items-center space-x-2 px-3 py-2 rounded-xl text-[#e5e5e5] hover:text-[#fca311] hover:bg-[#fca311]/10 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-medium text-sm">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* User Section */}
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-[#fca311]/20">
                {!user ? (
                  // Not logged in
                  <div className="flex items-center space-x-2">
                    {authLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`group flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                            link.label === "Login"
                              ? "text-white border border-[#e5e5e5]/30 hover:bg-[#e5e5e5] hover:text-black"
                              : "bg-[#fca311] text-black hover:bg-[#fca311]/90 hover:scale-105"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  // Logged in
                  <div className="flex items-center space-x-3">
                    {/* User Info */}
                    <div className="flex items-center space-x-2 px-3 py-2 bg-[#fca311]/10 rounded-xl border border-[#fca311]/20">
                      <div className="p-1 bg-[#fca311] rounded-lg">
                        {user.role === "admin" ? (
                          <Shield className="w-4 h-4 text-black" />
                        ) : (
                          <User className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">Welcome</div>
                        <div className="text-[#fca311] text-xs capitalize">{user.role}</div>
                      </div>
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={logout}
                      className="group flex items-center space-x-2 px-4 py-2 rounded-xl text-[#e5e5e5] hover:text-white hover:bg-red-500/20 border border-transparent hover:border-red-500/30 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-white hover:bg-[#fca311]/10 transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#14213d]/95 backdrop-blur-lg border-t border-[#fca311]/20 px-4 py-6">
            
            {/* Mobile Navigation Links */}
            <div className="space-y-2 mb-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[#e5e5e5] hover:text-white hover:bg-[#fca311]/10 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Admin Links Mobile */}
            {user?.role === "admin" && (
              <div className="space-y-2 mb-6 pt-4 border-t border-[#fca311]/20">
                <div className="px-4 mb-3">
                  <span className="text-[#fca311] text-sm font-semibold uppercase tracking-wide">Admin Panel</span>
                </div>
                {adminLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[#e5e5e5] hover:text-[#fca311] hover:bg-[#fca311]/10 transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-[#fca311]/20">
              {!user ? (
                <div className="space-y-3">
                  {authLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          link.label === "Login"
                            ? "text-white border border-[#e5e5e5]/30 hover:bg-[#e5e5e5] hover:text-black"
                            : "bg-[#fca311] text-black hover:bg-[#fca311]/90"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {/* User Info Mobile */}
                  <div className="flex items-center space-x-3 px-4 py-3 bg-[#fca311]/10 rounded-xl border border-[#fca311]/20">
                    <div className="p-2 bg-[#fca311] rounded-lg">
                      {user.role === "admin" ? (
                        <Shield className="w-5 h-5 text-black" />
                      ) : (
                        <User className="w-5 h-5 text-black" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium">Welcome</div>
                      <div className="text-[#fca311] text-sm capitalize">{user.role}</div>
                    </div>
                  </div>
                  
                  {/* Logout Button Mobile */}
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-[#e5e5e5] hover:text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}