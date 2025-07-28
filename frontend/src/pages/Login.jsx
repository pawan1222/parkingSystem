import React, { useState } from "react";
import axios from "axios";


export default function Login() {
  const API_URL = "http://localhost:4000/api";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  
  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(API_URL);

    try {
      const res = await axios.post(`${API_URL}/user/login`, {
        email,
        password
      }, {
        withCredentials: true // send/receive cookies if backend uses them
      });

      setMsg("Login successful ✅");
      console.log(res.data); // You can redirect or store user info here
    } catch (error) {
      setMsg(error.response?.data?.msg || "Login failed ❌");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      {msg && <p className="mt-4 text-center text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
