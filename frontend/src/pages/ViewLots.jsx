import React, { useEffect, useState } from "react";
import { MapPin, Car, Building2, Loader2 } from "lucide-react";
import axios from "axios";

export default function ViewLots() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLots = async () => {
    try {
      // Simulating API call for demo - replace with your actual axios call
      await new Promise(resolve => setTimeout(resolve, 1000));
    
      
      // Your actual API call - uncomment this and remove mock data above
      
      const res = await axios.get("http://localhost:4000/api/user/lots", {
        withCredentials: true, // needed if auth is cookie-based
      });
      setLots(res.data.lots); // assumes { lots: [...] }
      
    } catch (err) {
      console.error(err);
      setError("Failed to load parking lots.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-amber-200 rounded-full animate-pulse mx-auto"></div>
          </div>
          <p className="text-slate-600 font-medium text-lg animate-pulse">Loading parking lots...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 font-semibold text-lg">{error}</p>
          <button 
            onClick={fetchLots}
            className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Parking
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent ml-3">
                Lots
              </span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto">
              Discover and explore available parking spaces in your area
            </p>
            <div className="flex items-center justify-center space-x-2 text-amber-400">
              <Car className="w-5 h-5" />
              <span className="text-sm font-medium">{lots.length} lots available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {lots.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-2">No lots available</h3>
            <p className="text-slate-500 text-lg">Check back later for new parking lots.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {lots.map((lot, index) => (
              <div
                key={lot._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <Building2 className="w-8 h-8 text-amber-400" />
                      <div className="flex items-center space-x-1 bg-amber-500/20 px-3 py-1 rounded-full">
                        <Car className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 text-sm font-semibold">{lot.totalSlots}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-amber-100 transition-colors duration-300">
                      {lot.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-slate-700 font-medium leading-relaxed">{lot.address}</p>
                        <p className="text-slate-500 text-sm mt-1">{lot.city}</p>
                      </div>
                    </div>
                  </div>

                  {/* Slot Indicator */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Total Slots</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-slate-900 font-bold text-lg">{lot.totalSlots}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}