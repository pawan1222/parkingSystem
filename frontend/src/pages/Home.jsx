import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Smart Parking System 🚗</h1>
        <p className="text-lg text-gray-700 mb-8">
          Find and book parking lots in your city with ease.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/lotsByCity"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            View Lots
          </Link>
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:bg-yellow-600 transition"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="mt-12 max-w-3xl text-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-2">How it Works?</h2>
        <p>
          1. Register or login to your account. <br />
          2. Search for parking lots in your city. <br />
          3. Book a slot and get parking instantly!
        </p>
      </div>
    </div>
  );
}
