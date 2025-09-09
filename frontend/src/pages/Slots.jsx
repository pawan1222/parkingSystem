import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Slots() {
  const { lotId } = useParams();
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/slots/getSlots/${lotId}`, {
          withCredentials: true,
        });
        setSlots(res.data.data || []);
      } catch (err) {
        setError("Failed to fetch slots.");
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [lotId]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-32 w-full"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with gradient background using color palette */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-90"
          style={{
            background: 'linear-gradient(135deg, #000000 0%, #14213d 50%, #000000 100%)'
          }}
        ></div>
        <div className="relative px-6 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Back button with modern styling */}
            <Link
              to="/lotsByCity"
              className="group inline-flex items-center space-x-2 text-white hover:text-yellow-400 transition-all duration-300 mb-6 font-medium"
              style={{ '--hover-color': '#fca311' }}
            >
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Lots</span>
            </Link>
            
            {/* Title with modern typography */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span 
                  className="bg-gradient-to-r bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #fca311 50%, #ffffff 100%)'
                  }}
                >
                  Available
                </span>
                <br />
                <span style={{ color: '#fca311' }}>Slots</span>
              </h1>
              <p className="text-xl max-w-2xl" style={{ color: '#e5e5e5' }}>
                Choose from our premium parking spaces designed for your convenience
              </p>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-10 animate-pulse" style={{ backgroundColor: '#fca311' }}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-10 animate-pulse" style={{ backgroundColor: '#fca311', animationDelay: '1s' }}></div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {error && (
          <div className="mb-8 p-4 border-l-4 rounded-r-lg animate-fade-in" style={{ backgroundColor: '#fff5f5', borderColor: '#f56565' }}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" style={{ color: '#f56565' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="font-medium" style={{ color: '#c53030' }}>{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <LoadingSkeleton />
        ) : slots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {slots.map((slot, index) => (
              <div
                key={slot._id}
                className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                style={{ 
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                }}
              >
                {/* Status indicator */}
                <div className="absolute top-4 right-4 z-10">
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ 
                      backgroundColor: slot.status === "occupied" ? '#ef4444' : '#10b981' 
                    }}
                  ></div>
                </div>

                {/* Card background with simple overlay */}
                <div 
                  className="absolute inset-0 opacity-3 pointer-events-none"
                  style={{
                    backgroundColor: slot.status === "occupied" ? '#ef4444' : '#10b981'
                  }}
                ></div>

                {/* Card content */}
                <div className="relative p-6 z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: slot.status === "occupied" ? '#fef2f2' : '#f0fdf4',
                          color: slot.status === "occupied" ? '#dc2626' : '#059669'
                        }}
                      >
                        {slot.status === "occupied" ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: '#14213d' }}>
                          Slot #{index + 1}
                        </h3>
                        <p 
                          className="text-sm font-medium capitalize"
                          style={{ 
                            color: slot.status === "occupied" ? '#dc2626' : '#059669' 
                          }}
                        >
                          {slot.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action button */}
                  {slot.status === "available" && (
                    <Link
                      to={`/booking/${slot._id}`}
                      className="w-full inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 focus:outline-none shadow-md hover:shadow-lg relative z-20"
                      style={{
                        backgroundColor: '#fca311',
                        pointerEvents: 'auto'
                      }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book This Slot
                    </Link>
                  )}

                  {slot.status === "occupied" && (
                    <div 
                      className="w-full px-6 py-3 font-semibold rounded-xl text-center"
                      style={{ 
                        backgroundColor: '#e5e5e5',
                        color: '#6b7280'
                      }}
                    >
                      Currently Occupied
                    </div>
                  )}
                </div>

                {/* Hover shimmer effect - simplified */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none z-5"></div>
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-center py-16">
              <div 
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#e5e5e5' }}
              >
                <svg className="w-12 h-12" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#14213d' }}>
                No Slots Available
              </h3>
              <p className="max-w-md mx-auto" style={{ color: '#6b7280' }}>
                There are currently no parking slots available for this lot. Please check back later or try a different location.
              </p>
            </div>
          )
        )}
      </div>

      <style>{`
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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .text-4xl { 
            font-size: 2.5rem !important; 
          }
          .text-5xl { 
            font-size: 3rem !important; 
          }
          .text-6xl { 
            font-size: 3.5rem !important; 
          }
        }
      `}</style>
    </div>
  );
}