import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Must match the User model name
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true,
    unique: true // optional, but usually vehicle numbers are unique
  }
}, { timestamps: true });

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
