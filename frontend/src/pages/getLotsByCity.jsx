import React, { useState } from "react";
import axios from "axios";

export default function GetLotsByCity() {
  const [city, setCity] = useState("");
  const [lots, setLots] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!city.trim()) {
      setError("City is required");
      return;
    }

    try {
      const response = await axios.post("/api/lot/getLotsByCity", { city });
      setLots(response.data.lotsCity);
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
      setLots([]);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Find Parking Lots by City</h2>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="w-full p-2 border border-gray-300 rounded mb-3"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {lots.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Available Lots:</h3>
          <ul className="list-disc list-inside">
            {lots.map((lot) => (
              <li key={lot._id}>
                <strong>{lot.name}</strong> - {lot.location?.address || "No address"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
