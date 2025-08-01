import { parkingLot } from "../models/parkingLot.model.js";
import { Slot } from "../models/slot.model.js";
import User from "../models/user.model.js";

export const addLots = async (req, res) => {
    const { name, city, address, totalSlots } = req.body;

    try {
        if (!name || !city || !address || !totalSlots) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const lot = await parkingLot.create({
            name,
            city,
            address,
            totalSlots
        })

        if (!lot) {
            return res.status(400).json({ msg: "Error Adding parking lot" });
        }

        let arr = []

        for (let i = 0; i < totalSlots; i++) {
            let obj = {
                parkingLotId: lot._id,
                slotNumber: "S" + (i + 1),
                status: "available"
            }

            arr.push(obj)
        }

        const slots = await Slot.insertMany(arr);
        
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { lots: lot._id }
        });

        return res.status(201).json({ msg: "Lot created" });
    } catch (error) {
        console.log("Error in lot controller");
        return res.status(500).json({ msg: "Server error in parkingLot Controller" });

    }
}

export const getLotsByCity = async (req, res) => {
    const { city } = req.body;

    if (!city) {
        return res.status(401).json({ msg: "mandatory field city" })
    }

    const lotsCity = await parkingLot.find({ city });

    if (!lotsCity) {
        return res.status(401).json({ msg: "City not Available" })
    }

    return res.status(200).json({ lotsCity });

}