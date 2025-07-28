import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Lots() {
  const [city, setCity] = useState("");
  const [lots, setLots] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFetchLots = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/lot/getLotsByCity",
        { city: city.trim() },
        { withCredentials: true }
      );
      setLots(res.data.lotsCity || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch lots.");
      setLots([]);
    }
  };

  const handleLotClick = (lotId) => {
    navigate(`/slots/${lotId}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Find Parking Lots by City</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city name"
          className="flex-grow border p-2 rounded-md"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleFetchLots}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {lots.length > 0 && (
        <ul className="space-y-4 mb-8">
          {lots.map((lot) => (
            <li
              key={lot._id}
              className="p-4 border rounded-md shadow cursor-pointer hover:bg-gray-100"
              onClick={() => handleLotClick(lot._id)}
            >
              <h2 className="text-lg font-semibold">{lot.name}</h2>
              <p className="text-sm text-gray-600">{lot.city}</p>
              <p className="text-sm text-gray-600">{lot.address}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
