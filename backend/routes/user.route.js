import {authorize} from "../middleware/user.middleware.js"
import express from "express"
import { currentUser, login, logout, SignUp } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register',SignUp)
router.post('/login',login)
router.get('/logout',authorize,logout)
router.get('/currentUser',authorize,currentUser)

export default router