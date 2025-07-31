import React, { useState } from "react";
import { MapPin, Search, AlertCircle, Car, Navigation, ArrowRight, Zap } from "lucide-react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Lots() {
  const [city, setCity] = useState("");
  const [lots, setLots] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock navigate function - replace with actual useNavigate() hook
  const navigate = useNavigate();

  const handleFetchLots = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/lot/getLotsByCity",
        { city: city.trim() },
        { withCredentials: true }
      );
      setLots(res.data.lotsCity || []);
      
      
    } catch (err) {
      setError("Failed to fetch lots.");
      setLots([]);
      setIsLoading(false);
    }
  };

  const handleLotClick = (lotId) => {
    navigate(`/slots/${lotId}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchLots();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#14213d] to-black py-8 px-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#fca311]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#fca311]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#fca311]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#fca311] rounded-2xl mb-4 group hover:rotate-12 transition-transform duration-300">
            <Car className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Find Parking Lots by City</h1>
          <p className="text-[#e5e5e5] text-lg">Discover available parking spaces in your desired location</p>
        </div>

        {/* Search Card */}
        <div className="bg-gradient-to-br from-[#14213d]/90 to-[#14213d]/70 backdrop-blur-xl border border-[#fca311]/20 rounded-3xl shadow-2xl shadow-black/30 p-8 mb-8">
          
          {/* Search Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative group">
              <Navigation className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#fca311] group-focus-within:scale-110 transition-transform duration-300" />
              <input
                type="text"
                placeholder="Enter city name (e.g., New York, London)"
                className="w-full pl-12 pr-4 py-4 bg-black/20 border border-[#e5e5e5]/20 rounded-xl text-white placeholder-[#e5e5e5]/60 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20 focus:outline-none transition-all duration-300 text-lg"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <button
              onClick={handleFetchLots}
              disabled={isLoading}
              className="group bg-gradient-to-r from-[#fca311] to-[#fca311]/90 text-black font-bold py-4 px-8 rounded-xl hover:from-[#fca311]/90 hover:to-[#fca311] transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-[#fca311]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none sm:w-auto w-full"
            >
              <span className="flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Search</span>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {lots.length > 0 && (
          <div className="bg-gradient-to-br from-[#14213d]/90 to-[#14213d]/70 backdrop-blur-xl border border-[#fca311]/20 rounded-3xl shadow-2xl shadow-black/30 p-8">
            
            {/* Results Header */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-[#fca311]/10 rounded-xl">
                <MapPin className="w-6 h-6 text-[#fca311]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Available Parking Lots</h2>
                <p className="text-[#e5e5e5]">Found {lots.length} parking {lots.length === 1 ? 'lot' : 'lots'} in {city}</p>
              </div>
            </div>

            {/* Lots List */}
            <div className="space-y-4">
              {lots.map((lot, index) => (
                <div
                  key={lot._id}
                  className="group bg-gradient-to-r from-black/40 to-[#14213d]/40 backdrop-blur-sm border border-[#fca311]/10 rounded-2xl p-6 hover:border-[#fca311]/30 hover:bg-gradient-to-r hover:from-[#fca311]/5 hover:to-[#14213d]/60 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                  onClick={() => handleLotClick(lot._id)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Lot Icon */}
                      <div className="flex items-center justify-center w-12 h-12 bg-[#fca311]/20 rounded-xl group-hover:bg-[#fca311]/30 transition-colors duration-300">
                        <Car className="w-6 h-6 text-[#fca311]" />
                      </div>

                      {/* Lot Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#fca311] transition-colors duration-300 mb-1">
                          {lot.name}
                        </h3>
                        
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-[#e5e5e5] text-sm">
                            <MapPin className="w-4 h-4 text-[#fca311]" />
                            <span>{lot.city}</span>
                          </div>
                          
                          {lot.address && (
                            <div className="flex items-center space-x-2 text-[#e5e5e5]/80 text-sm">
                              <div className="w-4 h-4" /> {/* Spacer */}
                              <span>{lot.address}</span>
                            </div>
                          )}
                        </div>

                        {/* Additional Info */}
                        <div className="flex items-center space-x-4 mt-3">
                          {lot.totalSpaces && (
                            <div className="flex items-center space-x-1 text-[#fca311] text-sm">
                              <div className="w-2 h-2 bg-[#fca311] rounded-full"></div>
                              <span>{lot.totalSpaces} spaces</span>
                            </div>
                          )}
                          
                          {lot.pricePerHour && (
                            <div className="flex items-center space-x-1 text-green-400 text-sm">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span>${lot.pricePerHour}/hr</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center space-x-3">
                      {/* Quick Status */}
                      <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-[#fca311]/10 rounded-lg">
                        <Zap className="w-4 h-4 text-[#fca311]" />
                        <span className="text-[#fca311] text-sm font-medium">Available</span>
                      </div>
                      
                      {/* Arrow */}
                      <ArrowRight className="w-6 h-6 text-[#fca311] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-[#fca311]/10 text-center">
              <p className="text-[#e5e5e5] text-sm">
                Click on any parking lot to view available slots and book your space
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {lots.length === 0 && !error && city && !isLoading && (
          <div className="bg-gradient-to-br from-[#14213d]/90 to-[#14213d]/70 backdrop-blur-xl border border-[#fca311]/20 rounded-3xl shadow-2xl shadow-black/30 p-8 text-center">
            <div className="w-16 h-16 bg-[#fca311]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#fca311]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Parking Lots Found</h3>
            <p className="text-[#e5e5e5]">Try searching for a different city or check your spelling.</p>
          </div>
        )}
      </div>
    </div>
  );
}