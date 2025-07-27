import {authorize} from "../middleware/user.middleware.js"
import express from "express"
import { login, logout, SignUp } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register',SignUp)
router.post('/login',login)
router.get('/logout',authorize,logout)

export default router