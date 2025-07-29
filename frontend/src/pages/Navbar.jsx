import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Parking App</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-yellow-300">Home</Link>
          </li>
          <li>
            <Link to="/lotsByCity" className="hover:text-yellow-300">Lots</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-yellow-300">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-yellow-300">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
