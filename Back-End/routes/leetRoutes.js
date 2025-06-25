import express from "express";
const router = express.Router();
import axios from "axios";
router.get("/leetcode/:username",async (req,res)=>{
    const {username} = req.params;
    try {
        const response = await axios.get(`https://leetcode-api-pied.vercel.app/user/${username}`);
        if(!response.data){
            return res.status(401).json({message:"There is no data in it"});
            
        }
        return res.json(response.data);
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:error.message});
    }
})

export default router;