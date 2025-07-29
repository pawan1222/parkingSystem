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
  const [ticket, setTicket] = useState(null); // ⬅️ NEW

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
      setTicket(res.data.ticket); // ⬅️ SET TICKET DATA
      setFormData({ vehicleNumber: "", startTime: "", endTime: "" });
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Booking failed.");
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Book Slot
        </h2>

        {message && (
          <p
            className={`text-center mb-4 ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Vehicle Number
            </label>
            <input
              type="text"
              name="vehicleNumber"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g., UP65AB1234"
              value={formData.vehicleNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      {/* ✅ Ticket Section */}
      {ticket && (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-gray-800">
          <h3 className="text-xl font-bold mb-4 text-center text-green-600">🎫 Booking Ticket</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Ticket ID:</strong> {ticket.bookedTicket._id}</p>
            <p><strong>Vehicle Number:</strong> {ticket.vehicleNumber}</p>
            <p><strong>Slot ID:</strong> {ticket.bookedTicket.slotId}</p>
            <p><strong>Start Time:</strong> {new Date(ticket.bookedTicket.startTime).toLocaleString()}</p>
            <p><strong>End Time:</strong> {new Date(ticket.bookedTicket.endTime).toLocaleString()}</p>
            <p><strong>Status:</strong> ✅ {ticket.bookedTicket.status || "Confirmed"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
