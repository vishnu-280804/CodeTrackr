import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyToken from "../middlewares/auth.js";
dotenv.config();
const app = express();
app.use(cookieParser());


const router = express.Router();

router.post("/signup",async (req,res)=>{
    try {
        const {username,email,password,lc,github,codeforces,twitter} = req.body;
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password,salt);
        
         const user = new User({
      username,
      email,
      password: hashedPassword,
      lc,
      github,
      codeforces,
      twitter
    });
        await user.save();
        return res.status(201).json({message:"User signed up"});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"User did not signup"});
    }
});

router.post("/login",async (req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username:username});
        console.log(process.env.secretKey);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const isCheck = await bcrypt.compare(password, user.password);
        if (!isCheck) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({id:user._id,username:username},process.env.secretKey,{expiresIn:'1d'});
        res.cookie('token',token,{
            httpOnly:true,
            sameSite:'Strict',
            secure:false,
            maxAge:24*60*60*1000
        });

        return res.status(200).json({ message: "Login successful" });
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({message:"Please check the error"});
    }
});

router.post("/logout",(req,res)=>{
    res.clearCookie('token');
    return res.status(201).json({message:"Logged out successfully"});

})

router.get("/verify",(req,res)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message:"No token"});

    jwt.verify(token,process.env.secretKey,(err,user)=>{
        try {
            res.status(201).json({loggedIn:true,user});
        } catch (err) {
            res.status(401).json({loggedIn:false});
        }
    })
});


export default router;