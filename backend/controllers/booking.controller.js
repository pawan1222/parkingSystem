import { Booking } from "../models/booking.model.js";
import { Slot } from "../models/slot.model.js";
import { Vehicle } from "../models/vehicle.model.js";

export const bookTicket = async (req, res) => {
    const { vehicleNumber, startTime, endTime, slotId } = req.body;

    const slot = await Slot.findById(slotId);
    if (slot.status != "available") {
        return res.status(401).json({ msg: "slot not available" });
    }

    
    

    let vehicle = await Vehicle.findOne({ vehicleNumber });

    if (!vehicle) {
        vehicle = await Vehicle.create({
            userId: req.user,
            vehicleNumber,
        });
    }

    if (!vehicle) {
        return res.status(401).json({ msg: "error adding vehicle" });
    }

    let end = new Date(endTime)
    let start = new Date(startTime)
    let diffMilli = end - start
    
    
    
    let hours = diffMilli / (1000 * 60 * 60);
    

    let charges = Number(hours * 20);
    
    

    const bookedTicket = await Booking.create({
        vehicleId: vehicle._id,
        startTime,
        endTime,
        slotId,
        charges,
        status: "booked"
    });

    if (!bookedTicket) {
        return res.status(401).json({ msg: "unable to book ticket" });
    }

    

    slot.status = "occupied"
    await slot.save();
    return res.status(201).json({ msg: "ticket booked successfully", ticket: bookedTicket });
}










