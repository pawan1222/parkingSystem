import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Booking() {
  const { slotId } = useParams();

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    startTime: "",
    endTime: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { vehicleNumber, startTime, endTime } = formData;

    if (!vehicleNumber || !startTime || !endTime) {
      setMessage("All fields are required.");
      setSuccess(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/bookSlot/book",
        {
          vehicleNumber,
          startTime,
          endTime,
          slotId,
        },
        { withCredentials: true }
      );

      console.log("Booking successful:", res.data);
      setMessage(res.data.msg);
      setSuccess(true);
      setTicket(res.data.ticket);
      setFormData({ vehicleNumber: "", startTime: "", endTime: "" });
    } catch (err) {
      console.log("Booking error:", err);
      setMessage(err.response?.data?.msg || "Booking failed.");
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

      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" 
               style={{ backgroundColor: '#fca311' }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#14213d' }}>
            Book Your Slot
          </h1>
          <p className="text-lg" style={{ color: '#6b7280' }}>
            Reserve your parking space in just a few clicks
          </p>
        </div>

        {/* Main Booking Form */}
        <div className="w-full max-w-md relative">
          <div 
            className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-0 relative overflow-hidden animate-slide-up"
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
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#14213d' }}>
              Reservation Details
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
                  className="font-medium"
                  style={{ color: success ? '#047857' : '#dc2626' }}
                >
                  {message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vehicle Number Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: '#14213d' }}>
                  Vehicle Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="vehicleNumber"
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
                    placeholder="e.g., UP65AB1234"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Start Time Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: '#14213d' }}>
                  Start Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type="datetime-local"
                    name="startTime"
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
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* End Time Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold" style={{ color: '#14213d' }}>
                  End Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" style={{ color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type="datetime-local"
                    name="endTime"
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
                    value={formData.endTime}
                    onChange={handleChange}
                  />
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
                    : 'linear-gradient(135deg, #fca311 0%, #f59e0b 100%)',
                  color: '#ffffff',
                  boxShadow: '0 10px 25px rgba(252, 163, 17, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
                    e.target.style.boxShadow = '0 15px 35px rgba(252, 163, 17, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.background = 'linear-gradient(135deg, #fca311 0%, #f59e0b 100%)';
                    e.target.style.boxShadow = '0 10px 25px rgba(252, 163, 17, 0.3)';
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Confirm Booking</span>
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Ticket Section */}
          {ticket && (
            <div 
              className="bg-white rounded-2xl shadow-xl p-6 border-0 relative overflow-hidden animate-slide-up"
              style={{ 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                animationDelay: '0.4s'
              }}
            >
              {/* Ticket Header */}
              <div className="text-center mb-6">
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ backgroundColor: '#10b981' }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#10b981' }}>
                  🎫 Booking Confirmed!
                </h3>
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  Your parking slot has been successfully reserved
                </p>
              </div>

              {/* Decorative dashed line */}
              <div className="border-t-2 border-dashed mb-6" style={{ borderColor: '#e5e5e5' }}></div>

              {/* Ticket Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                  <span className="font-medium" style={{ color: '#6b7280' }}>Ticket ID:</span>
                  <span className="font-mono text-sm font-bold" style={{ color: '#14213d' }}>
                    {ticket.bookedTicket._id}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                  <span className="font-medium" style={{ color: '#6b7280' }}>Vehicle:</span>
                  <span className="font-bold" style={{ color: '#14213d' }}>
                    {ticket.bookedTicket.vehicleNumber}
                  </span>
                </div>

                 <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                  <span className="font-medium" style={{ color: '#6b7280' }}>Lot Name:</span>
                  <span className="font-mono text-sm font-bold" style={{ color: '#14213d' }}>
                    {ticket.bookedTicket.lotName}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                  <span className="font-medium" style={{ color: '#6b7280' }}>Lot Address:</span>
                  <span className="font-mono text-sm font-bold" style={{ color: '#14213d' }}>
                    {ticket.bookedTicket.lotAddress}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                  <span className="font-medium" style={{ color: '#6b7280' }}>Slot Number:</span>
                  <span className="font-mono text-sm font-bold" style={{ color: '#14213d' }}>
                    {ticket.bookedTicket.slotNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                  <span className="font-medium" style={{ color: '#6b7280' }}>Start Time:</span>
                  <span className="font-semibold text-sm" style={{ color: '#14213d' }}>
                    {new Date(ticket.bookedTicket.startTime).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                  <span className="font-medium" style={{ color: '#6b7280' }}>End Time:</span>
                  <span className="font-semibold text-sm" style={{ color: '#14213d' }}>
                    {new Date(ticket.bookedTicket.endTime).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                  <span className="font-medium" style={{ color: '#6b7280' }}>Charges:</span>
                  <span className="font-semibold text-sm" style={{ color: '#14213d' }}>
                    {ticket.bookedTicket.charges}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f0fdf4' }}>
                  <span className="font-medium" style={{ color: '#6b7280' }}>Status:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#10b981' }}></div>
                    <span className="font-bold" style={{ color: '#10b981' }}>
                      {ticket.bookedTicket.status || "Confirmed"}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="mt-6 p-4 text-center rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                <div 
                  className="w-20 h-20 mx-auto mb-2 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#e5e5e5' }}
                >
                  <svg className="w-10 h-10" style={{ color: '#9ca3af' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs" style={{ color: '#9ca3af' }}>
                  Show this ticket at the parking entrance
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
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

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        /* Enhanced form styling */
        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          filter: invert(0.5);
          cursor: pointer;
        }

        input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover {
          filter: invert(0.3);
        }

        /* Responsive improvements */
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 2.5rem;
          }
          
          .p-8 {
            padding: 1.5rem;
          }
          
          .space-y-6 > * + * {
            margin-top: 1rem;
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

        /* Pulse animation for status indicators */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}