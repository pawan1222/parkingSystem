import mongoose from "mongoose";

const parkingLotSchema = new mongoose.Schema({

    "name":{
        type:String,
        required : true
    },
    "address" : {
        type : String,
        required : true 
    },
    "city" : {
        type : String,
        required : true 
    },
    
    "totalSlots" : {
        type : Number,
        required : true
    }
},{timestamps : true})

export const parkingLot = mongoose.model("parkingLot",parkingLotSchema);