import {authorizeAdmin} from "../middleware/admin.middleware..js"
import {authorize} from "../middleware/user.middleware.js"
import express from "express"
import { addLots, getLotsByCity } from "../controllers/parkingLot.controller.js";

const router = express.Router();

router.post('/addLot',authorizeAdmin,addLots)
router.post('/getLotsByCity',authorize,getLotsByCity)
export default router