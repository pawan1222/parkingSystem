import mongoose from "mongoose";
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";
import { Booking } from "../models/booking.model.js";
import { parkingLot } from "../models/parkingLot.model.js";

export const SignUp = async (req, res) => {
    const { name, email, password, role } = req.body;


    try {
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are mandatory" });
        }
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password Length should be at least 6" })
        }
        const isValid = await User.findOne({ email });
        if (isValid) {
            return res.status(404).json({ msg: "user Already Exists " });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newSUer = {
            name,
            password: hashedPassword,
            email,
            role
        }

        const user = await User.create(newSUer);



        return res.status(200).json({ msg: "USer registered successfully", user: user })


    } catch (error) {
        console.log("Error is signUp controller ", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "Invalid Credentials!" });
        }

        generateToken(user._id, res);

        return res.status(200).json({
            user: user,
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {

    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ msg: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const currentUser = async (req, res) => {

    try {
        return res.status(200).json({ user: req.user })
    } catch (error) {
        console.log("Error in currentUser controller", error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const getTicketByUserId = async (req, res) => {
    try {
        const tickets = await Booking.find({ userId: req.user._id }).select("-slotId -vehicleId -userId");
        return res.status(201).json({ tickets });
    } catch (error) {
        console.log("Error getting tickets");
        return res.status(501).json({ msg: "Internal server error" });
    }
}

export const getLots = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("lots");


        return res.status(200).json({ lots: user.lots })
    } catch (error) {
        console.log("Error in getLots", err);
        return res.status(500).json({ message: "Internal server error" })

    }
}