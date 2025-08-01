import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  lotName: {
    type: String,
    required: true
  },
  lotAddress: {
    type: String,
    required: true
  },
  slotNumber: {
    type: String,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot", // You can replace "Slot" with your actual Slot model name
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  charges: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["booked", "cancelled", "completed"],
    default: "booked"
  }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
