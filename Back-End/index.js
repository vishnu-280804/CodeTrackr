import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"
import leetRoutes from "./routes/leetRoutes.js"
import axios from "axios";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import verifyToken from "./middlewares/auth.js";
import reviewRoutes from "./routes/reviewRoutes.js";


const app = express();
app.use(express.json());s

app.use(cors({
  origin: ["http://localhost:5173", "https://codetrackerr.onrender.com"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // parses URL-encoded data

app.use(express.json());
app.use("/l",leetRoutes);
app.use("/api",authRoutes);
app.get("/api/protect-route", verifyToken, (req, res) => {
  return res.json({ isLoggedin: true, user: req.user });
});
app.use("/review",reviewRoutes);
app.use("/users",userRoutes);
app.get("/lc/:lcUsername",async (req,res)=>{
    try {
        const lcUsername = req.params.lcUsername;
        const response = await axios.get(`https://leetcode-api-pied.vercel.app/user/${lcUsername}`);
        console.log(response.profile);
        return res.status(200).json(response.data.profile);
    } catch (error) {
        console.log("There is nothing to fetch")
        return res.status(401).json({message:"Nothing to fetch"})
    }
})
mongoose.connect("mongodb+srv://vmusix01:DJGDlcor1PfyFmFA@devpro.kv2bcjm.mongodb.net/?retryWrites=true&w=majority&appName=devpro");
app.listen(3000,()=>{
    console.log("Running successfully");
})