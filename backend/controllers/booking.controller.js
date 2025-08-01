import { Booking } from "../models/booking.model.js";
import { parkingLot } from "../models/parkingLot.model.js";
import { Slot } from "../models/slot.model.js";
import { Vehicle } from "../models/vehicle.model.js";



async function getTicketBySlot(slotId) {
    return await Booking.find({ slotId, status: "booked" });
}



export const bookTicket = async (req, res) => {
    const { vehicleNumber, startTime, endTime, slotId } = req.body;

    const slot = await Slot.findById(slotId);
    const lot = await parkingLot.findById(slot.parkingLotId);

    if (slot.status != "available") {
        return res.status(401).json({ msg: "slot not available" });
    }

    let end = new Date(endTime)
    let start = new Date(startTime)


    let alreadyBookedTime = await getTicketBySlot(slotId);
    console.log(alreadyBookedTime);

    if (alreadyBookedTime) {
        for (let alreadyBooked of alreadyBookedTime) {
            if (
                ( (start >= alreadyBooked.startTime && start <= alreadyBooked.endTime) ||
                    (end >= alreadyBooked.startTime && end <= alreadyBooked.endTime)) || ((start <= alreadyBooked.startTime && end >= alreadyBooked.endTime))
            ) {
                console.log(alreadyBooked+ " in return");
                
                return res.status(401).json({
                    msg: "Already booked in this time slot",
                    alreadyBooked: alreadyBooked
                });
            }
        }
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

    

    let diffMilli = end - start



    let hours = diffMilli / (1000 * 60 * 60);


    let charges = Number(hours * 20);



    const bookedTicket = await Booking.create({
        lotName : lot.name,
        lotAddress : lot.address,
        slotNumber : slot.slotNumber,
        vehicleNumber : vehicle.vehicleNumber,
        userId : req.user._id,
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



    setTimeout(async () => {
        slot.status = "occupied"
        await slot.save();
    }, (start - Date.now()))


    setTimeout(async () => {
        bookedTicket.status = "completed";
        slot.status = "available";
        await bookedTicket.save();
        await slot.save();
    }, diffMilli + (start - Date.now()));


    return res.status(201).json({ msg: "ticket booked successfully", ticket: { bookedTicket} });
}




