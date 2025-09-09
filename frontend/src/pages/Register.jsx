import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // clear message when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const { name, email, password, role } = formData;
    if (!name || !email || !password || !role) {
      setMessage("All fields are required.");
      setSuccess(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/register`, formData);
      console.log("Registration response:", res.data);
      setMessage("Registration successful!");
      setSuccess(true);
      setFormData({ name: "", email: "", password: "", role: "" });
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Registration failed.");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-5 animate-pulse"
          style={{ backgroundColor: '#fca311' }}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-5 animate-pulse"
          style={{ backgroundColor: '#14213d', animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-3 animate-pulse"
          style={{ backgroundColor: '#fca311', animationDelay: '4s' }}
        ></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
        {/* Header Section */}
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" 
                 style={{ backgroundColor: '#fca311' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#14213d' }}>
              Join Us Today
            </h1>
            <p className="text-lg" style={{ color: '#6b7280' }}>
              Create your account and start parking smart
            </p>
          </div>

          {/* Main Registration Form */}
          <div 
            className="bg-white rounded-2xl shadow-xl p-8 border-0 relative overflow-hidden animate-slide-up"
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              animationDelay: '0.2s'
            }}
          >
            {/* Decorative elements */}
            <div 
              className="absolute top-0 left-0 w-full h-1"
              style={{ 
                background: 'linear-gradient(90deg, #fca311 0%, #f59e0b 50%, #fca311 100%)' 
              }}
            ></div>
            
            <div className="absolute top-4 right-4 opacity-10">
              <svg className="w-12 h-12" style={{ color: '#fca311' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#14213d' }}>
              Create Account
            </h2>

            {/* Status Message */}
            {message && (
              <div 
                className={`p-4 rounded-xl mb-6 flex items-center space-x-3 animate-fade-in ${
                  success ? 'border-l-4' : 'border-l-4'
                }`}
                style={{
                  backgroundColor: success ? '#f0fdf4' : '#fef2f2',
                  borderColor: success ? '#10b981' : '#ef4444'
                }}
              >
                <div className="flex-shrink-0">
                  {success ? (
                    <svg className="w-5 h-5" style={{ color: '#10b981' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" style={{ color: '#ef4444' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p 
                  className="font-medium text-sm"
                  style={{ color: success ? '#047857' : '#dc2626' }}
                >
                  {message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: '#14213d' }}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    className="w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4"
                    style={{
                      borderColor: '#e5e5e5',
                      backgroundColor: '#ffffff'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#fca311';
                      e.target.style.boxShadow = '0 0 0 4px rgba(252, 163, 17, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: '#14213d' }}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4"
                    style={{
                      borderColor: '#e5e5e5',
                      backgroundColor: '#ffffff'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#fca311';
                      e.target.style.boxShadow = '0 0 0 4px rgba(252, 163, 17, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: '#14213d' }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4"
                    style={{
                      borderColor: '#e5e5e5',
                      backgroundColor: '#ffffff'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#fca311';
                      e.target.style.boxShadow = '0 0 0 4px rgba(252, 163, 17, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: '#14213d' }}>
                  Account Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <select
                    name="role"
                    className="w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 appearance-none"
                    style={{
                      borderColor: '#e5e5e5',
                      backgroundColor: '#ffffff'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#fca311';
                      e.target.style.boxShadow = '0 0 0 4px rgba(252, 163, 17, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="">Choose your role</option>
                    <option value="user">User - Park & Pay</option>
                    <option value="admin">Admin - Manage Lots</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                style={{
                  background: isLoading 
                    ? '#9ca3af' 
                    : '#fca311',
                  color: '#ffffff',
                  boxShadow: '0 10px 25px rgba(252, 163, 17, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#f59e0b';
                    e.target.style.boxShadow = '0 15px 35px rgba(252, 163, 17, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#fca311';
                    e.target.style.boxShadow = '0 10px 25px rgba(252, 163, 17, 0.3)';
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Create Account</span>
                  </div>
                )}
              </button>

              {/* Additional Info */}
              <div className="text-center pt-4">
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  By creating an account, you agree to our{' '}
                  <span style={{ color: '#fca311' }} className="font-medium cursor-pointer hover:underline">
                    Terms of Service
                  </span>{' '}
                  and{' '}
                  <span style={{ color: '#fca311' }} className="font-medium cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        /* Responsive improvements */
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 2.5rem !important;
          }
          
          .p-8 {
            padding: 1.5rem !important;
          }
          
          .space-y-6 > * + * {
            margin-top: 1rem !important;
          }
        }

        /* Loading animation */
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Custom select dropdown styling */
        select {
          background-image: none;
        }
      `}</style>
    </div>
  );
}