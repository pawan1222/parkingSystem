import {authorize} from "../middleware/user.middleware.js"
import express from "express"
import { getSlotsByLotId } from "../controllers/slot.controller.js";

const router = express.Router();

router.get('/getSlots/:lotId',authorize,getSlotsByLotId)
export default router