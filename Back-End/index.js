import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"
//import leetRoutes from "./routes/leetRoutes.js"
import axios from "axios";
import cors from "cors"
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import verifyToken from "./middlewares/auth.js";
import reviewRoutes from "./routes/reviewRoutes.js";


const app = express();
app.use(cors({
  origin: "https://codetrackerr.onrender.com",
  credentials: true,
}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../Front-End/dist")));
app.get('/*any', (req, res) => {
  res.sendFile(path.join(__dirname, "../Front-End/dist/index.html"));
});




app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // parses URL-encoded data

///pp.use(express.json());
app.use("/l",leetRoutes);
app.use("/api",authRoutes);
app.get("/api/protect-route", verifyToken, (req, res) => {
  return res.json({ isLoggedin: true, user: req.user });
});
app.use("/review",reviewRoutes);
app.use("/users",userRoutes);
app.get("/github/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}`);
    
    if (!response.data) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.json(response.data);
  } catch (error) {
    console.error("GitHub API error:", error.message);
    return res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});app.get("/lc/:lcUsername",async (req,res)=>{
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
  console.log("....");
});