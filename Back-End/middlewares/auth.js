import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const verifyToken = async (req,res,next)=>{
    const token = req.cookies.token;
    console.log(token);
    console.log(process.env.secretKey);
    if(!token) return res.status(401).json({message:"There is no token found"});

    jwt.verify(token,process.env.secretKey,(err,user)=>{
        if(err) return res.status(401).json({message:err.message});

        req.user = user;
        
        next();
    })
};
export default verifyToken;