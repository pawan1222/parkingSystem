import {authorize} from "../middleware/user.middleware.js"
import express from "express"
import { currentUser, getLots, getTicketByUserId, login, logout, SignUp } from "../controllers/user.controller.js";
import { authorizeAdmin } from "../middleware/admin.middleware..js";

const router = express.Router();

router.post('/register',SignUp)
router.post('/login',login)
router.get('/logout',authorize,logout)
router.get('/currentUser',authorize,currentUser)
router.get('/tickets',authorize,getTicketByUserId)
router.get('/lots',authorizeAdmin,getLots)

export default router