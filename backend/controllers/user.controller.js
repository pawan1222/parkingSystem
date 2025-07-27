import mongoose from "mongoose";
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";

export const SignUp = async(req,res) => {
    const {name,email,password,role} = req.body;

    
    try {
        if(!name || !email || !password){
            res.status(400).json({msg : "All fields are mandatory"});
        }
        if(password.length < 6){
            res.status(400).json({msg : "Password Length should be at least 6"})
        }
        const isValid = await User.findOne({email});
        if(isValid){
            res.status(404).json({msg : "user Already Exists "});
        }

        const  hashedPassword = await bcrypt.hash(password,10);

        const newSUer = {
            name,
            password : hashedPassword,
            email,
            role
        }

        const user = await User.create(newSUer);



        res.status(200).json({msg : "USer registered successfully",user:user})

        
    } catch (error) {
        console.log("Error is signUp controller ",error);
        res.status(500).json({msg : "Internal server error"});
    }
} 


export const login = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email });
        if(!user){
            res.status(400).json({msg : "Invalid Credentials!"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            res.status(400).json({msg : "Invalid Credentials!"});
        }

        generateToken(user._id,res);
   
        return res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
        })
    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({msg : "Internal Server Error"});
    }
};

export const logout = async(req,res) =>{
    console.log(req.user);
    
    try {
        res.cookie("jwt","",{maxAge : 0});
        res.status(200).json({msg : "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({msg : "Internal Server Error"});
    }
}