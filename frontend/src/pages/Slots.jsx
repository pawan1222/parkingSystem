import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Slots() {
  const { lotId } = useParams(); // lotId
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/slots/getSlots/${lotId}`, {
          withCredentials: true,
        });
        setSlots(res.data.data || []);
      } catch (err) {
        setError("Failed to fetch slots.");
        setSlots([]);
      }
    };

    fetchSlots();
  }, [lotId]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Slots</h1>

      <Link
        to="/lotsByCity"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Lots
      </Link>

      {error && <p className="text-red-600">{error}</p>}

      {slots.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {slots.map((slot) => (
            <li
              key={slot._id}
              className={`p-4 border rounded-md shadow ${
                slot.status === "occupied" ? "bg-red-100" : "bg-green-100"
              }`}
            >
              <p><strong>Status:</strong> {slot.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p className="text-gray-500">No slots found.</p>
      )}
    </div>
  );
}
