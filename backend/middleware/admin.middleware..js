import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
export const authorizeAdmin = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(400).json({ msg: "Token expired" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({ msg: "Unauthorize access" });
        }

        const userId = decoded.userId;
        const user = await User.findById(userId);

        const role = user.role;
        if(role !== "admin"){
            return res.status(401).json({ msg: "Admin access only" });
        }

        req.user = user;
        
        next()
    } catch (error) {
        console.error("JWT Error:", err.message);
        return res.status(401).json({ msg: "Unauthorized. Invalid or expired token." });
    }
}




