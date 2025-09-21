import React, { useState, useEffect } from "react";
import { Car, MapPin, Clock, Shield, ArrowRight, Sparkles } from "lucide-react";

// Mock Link component for demonstration
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Find Nearby Lots",
      description: "Discover parking spaces close to your destination with real-time availability."
    },
    {
      icon: Clock,
      title: "Instant Booking",
      description: "Reserve your spot in seconds with our streamlined booking process."
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Pay safely with our encrypted payment system and get instant confirmation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#14213d] to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#fca311] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-[#fca311] rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-[#fca311] rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        
        {/* Hero Section */}
        <div 
          className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#14213d] border border-[#fca311]/20 rounded-full px-4 py-2 mb-6 animate-bounce">
            <Sparkles className="w-4 h-4 text-[#fca311]" />
            <span className="text-[#e5e5e5] text-sm font-medium">Smart Parking Revolution</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e5e5e5] to-[#fca311] mb-6 leading-tight">
            Welcome to
            <br />
            <span className="text-[#fca311] drop-shadow-lg">Smart Parking</span>
          </h1>

          {/* Car Icon with Animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Car className="w-16 h-16 text-[#fca311] animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#fca311] rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#e5e5e5] mb-12 max-w-2xl mx-auto leading-relaxed">
            Find and book premium parking spots in your city with 
            <span className="text-[#fca311] font-semibold"> lightning speed</span> and absolute ease.
          </p>

          {/* Action Buttons */}
{/*           <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              to="/lotsByCity"
              className="group relative bg-gradient-to-r from-[#fca311] to-[#fca311]/80 text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#fca311]/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                View Available Lots
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <Link
              to="/login"
              className="group bg-transparent border-2 border-[#e5e5e5] text-[#e5e5e5] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#e5e5e5] hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            
            <Link
              to="/register"
              className="group bg-[#14213d] border-2 border-[#14213d] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-transparent hover:border-[#fca311] hover:text-[#fca311] transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div> */}
        </div>

        {/* Features Section */}
        <div 
          className={`w-full max-w-6xl mx-auto transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Why Choose <span className="text-[#fca311]">Smart Parking</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 px-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-[#14213d] to-[#14213d]/80 backdrop-blur-lg border border-[#fca311]/20 rounded-3xl p-8 hover:border-[#fca311]/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                    hoveredCard === index ? 'shadow-2xl shadow-[#fca311]/20' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fca311]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-[#fca311]/10 rounded-2xl group-hover:bg-[#fca311]/20 transition-colors duration-300">
                        <Icon className="w-8 h-8 text-[#fca311] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-[#fca311] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-[#e5e5e5] text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it Works Section */}
        <div 
          className={`w-full max-w-4xl mx-auto mt-20 transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-r from-[#14213d]/60 to-[#14213d]/40 backdrop-blur-lg border border-[#fca311]/20 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              How It <span className="text-[#fca311]">Works</span>
            </h2>
            
            <div className="space-y-6">
              {[
                "Create your account or sign in to get started",
                "Search for available parking lots in your city",
                "Book your perfect spot and park with confidence!"
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#fca311] text-black rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <p className="text-[#e5e5e5] text-lg group-hover:text-white transition-colors duration-300">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Call-to-Action */}
        <div className="fixed bottom-8 right-8 z-50">
          <Link
            to="/lotsByCity"
            className="group bg-[#fca311] text-black p-4 rounded-full shadow-2xl hover:shadow-[#fca311]/30 transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none"
          >
            <Car className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
