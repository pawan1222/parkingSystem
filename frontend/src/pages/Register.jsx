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

    try {
      const res = await axios.post("http://localhost:4000/api/user/register", formData);
      console.log("Registration response:", res.data);
      setMessage("Registration successful!");
      setSuccess(true);
      setFormData({ name: "", email: "", password: "", role: "" });
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Registration failed.");
      setSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create an Account</h2>

        {message && (
          <p className={`text-center text-sm mb-4 ${success ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
