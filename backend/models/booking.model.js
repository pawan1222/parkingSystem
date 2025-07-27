import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
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
