import {authorize} from "../middleware/user.middleware.js"
import express from "express"
import { bookTicket } from "../controllers/booking.controller.js";

const router = express.Router();

router.post('/book',authorize,bookTicket)
export default router