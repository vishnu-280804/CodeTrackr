import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/platforms/:username",async (req,res)=>{
    const {username} = req.params;

    try {
        const user = await User.findOne({username});
        if(!user) return res.status(402).json({message:"User not found"});
        return res.json({
            github:user.github,
            leetcode:user.lc,
            codeforces:user.codeforces,
            twitter:user.twitter
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"There is an error"});
    }
});
export default router;

