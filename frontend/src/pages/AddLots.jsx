import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
export default function AddLots() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    totalSlots: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setIsLoading(true);

    if (!formData.name || !formData.city || !formData.address || !formData.totalSlots) {
      setIsLoading(false);
      return setError("Please fill out all fields.");
    }

    try {
      // Simulate API call - replace with actual axios call in your implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful response
      console.log("Adding lot:", {
        name: formData.name,
        city: formData.city,
        address: formData.address,
        totalSlots: Number(formData.totalSlots),
      });

      setSuccess("Lot added successfully!");
      setFormData({ name: "", city: "", address: "", totalSlots: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add lot.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Form Container */}
      <div className="relative w-full max-w-md mx-auto transform transition-all duration-700 ease-out hover:scale-105">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8 transform transition-all duration-500 ease-out">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-lg">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Add Parking Lot
              </h2>
              <p className="text-gray-300 text-sm">Create a new parking facility</p>
            </div>

            {/* Status Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-green-100 text-center transform transition-all duration-300 ease-out animate-pulse">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{success}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-100 text-center transform transition-all duration-300 ease-out animate-pulse">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Lot Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-200 mb-2 transition-colors duration-200 group-focus-within:text-yellow-400">
                  Lot Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ease-out backdrop-blur-sm hover:bg-white/15"
                    placeholder="e.g. University Parking"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/0 to-orange-500/0 group-focus-within:from-yellow-400/10 group-focus-within:to-orange-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* City */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-200 mb-2 transition-colors duration-200 group-focus-within:text-yellow-400">
                  City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ease-out backdrop-blur-sm hover:bg-white/15"
                    placeholder="e.g. Chandigarh"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/0 to-orange-500/0 group-focus-within:from-yellow-400/10 group-focus-within:to-orange-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Address */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-200 mb-2 transition-colors duration-200 group-focus-within:text-yellow-400">
                  Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ease-out backdrop-blur-sm hover:bg-white/15"
                    placeholder="e.g. CU Campus"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/0 to-orange-500/0 group-focus-within:from-yellow-400/10 group-focus-within:to-orange-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Total Slots */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-200 mb-2 transition-colors duration-200 group-focus-within:text-yellow-400">
                  Total Slots
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="totalSlots"
                    value={formData.totalSlots}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 ease-out backdrop-blur-sm hover:bg-white/15"
                    placeholder="e.g. 30"
                    min={1}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/0 to-orange-500/0 group-focus-within:from-yellow-400/10 group-focus-within:to-orange-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:transform-none relative overflow-hidden group"
              >
                <div className="relative z-10 flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Adding Lot...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add Lot</span>
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}