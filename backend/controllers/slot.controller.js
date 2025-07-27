import { Slot } from "../models/slot.model.js";

export const getSlotsByLotId = async(req,res) => {
 try {
   const {lotId} = req.params;
    
    

    if(!lotId){
        return res.status(401).json({msg : "Id not found"})
    }

    const slots = await Slot.find({parkingLotId:lotId});

    if(!slots){
        return res.status(401).json({msg : "slots not avl on this lot"})
    }

    return res.status(200).json({data : slots});
 } catch (error) {
    console.log("Error in getSlotsByLotId");
    res.status(500).json("Server error in slotController");
 }
}