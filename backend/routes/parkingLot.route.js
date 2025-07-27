import {authorizeAdmin} from "../middleware/admin.middleware..js"
import express from "express"
import { addLots } from "../controllers/parkingLot.controller.js";

const router = express.Router();

router.post('/addLot',authorizeAdmin,addLots)

export default router