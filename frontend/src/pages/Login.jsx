import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, Car, ArrowRight, CheckCircle, XCircle } from "lucide-react";

export default function Login() {
  const API_URL = `${import.meta.env.VITE_BASE_URL}/api`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(API_URL);

    try {
      const res = await axios.post(`${API_URL}/user/login`, {
        email,
        password
      }, {
        withCredentials: true // send/receive cookies if backend uses them
      });
      setUser(res.data.user);

      setMsg("Login successful ✅");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      console.log(res.data); // You can redirect or store user info here
    } catch (error) {
      setMsg(error.response?.data?.msg || "Login failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#14213d] to-black flex items-center justify-center px-4 py-8">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-[#fca311]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-[#fca311]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#fca311]/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-[#14213d]/90 to-[#14213d]/70 backdrop-blur-xl border border-[#fca311]/20 rounded-3xl shadow-2xl shadow-black/30 p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#fca311] rounded-2xl mb-4 group hover:rotate-12 transition-transform duration-300">
              <Car className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-[#e5e5e5]">Sign in to your parking account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="relative group">
              <label className="block text-[#e5e5e5] text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#fca311] group-focus-within:scale-110 transition-transform duration-300" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-black/20 border border-[#e5e5e5]/20 rounded-xl text-white placeholder-[#e5e5e5]/60 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20 focus:outline-none transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <label className="block text-[#e5e5e5] text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#fca311] group-focus-within:scale-110 transition-transform duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-black/20 border border-[#e5e5e5]/20 rounded-xl text-white placeholder-[#e5e5e5]/60 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20 focus:outline-none transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#e5e5e5] hover:text-[#fca311] transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full bg-gradient-to-r from-[#fca311] to-[#fca311]/90 text-black font-bold py-4 px-6 rounded-xl hover:from-[#fca311]/90 hover:to-[#fca311] transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-[#fca311]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Message Display */}
          {msg && (
            <div className={`mt-6 p-4 rounded-xl border flex items-center space-x-3 animate-fadeIn ${
              msg.includes("successful") 
                ? "bg-green-500/10 border-green-500/30 text-green-400" 
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
              {msg.includes("successful") ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{msg}</p>
            </div>
          )}

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-[#e5e5e5]">
              Don't have an account?{" "}
              <a href="/register" className="text-[#fca311] hover:text-[#fca311]/80 font-medium transition-colors duration-300">
                Sign up here
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#fca311] rounded-lg opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#fca311] rounded-full opacity-30 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}