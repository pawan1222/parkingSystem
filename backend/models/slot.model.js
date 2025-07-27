import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({


    "parkingLotId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "parkingLot"
    },
    "slotNumber" : {
        type : String,
        required : true
    },
    "status" : {
        type : String,
        enum : ["occupied","available"],
        default : "available"
    }
},{timestamps : true})

export const Slot = mongoose.model("Slot",slotSchema);