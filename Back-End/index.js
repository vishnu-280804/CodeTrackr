import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import verifyToken from "./middlewares/auth.js";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const app = express();

// Enable CORS
app.use(cors({
  origin: "https://codetrackerr.onrender.com",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, "../Front-End/dist")));

// ✅ GitHub Contributions Proxy
app.get("/github/:username", async (req, res) => {
  const { username } = req.params;
  console.log(`🟡 GitHub route hit for user: ${username}`);
  try {
    const response = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}`);
    if (!response.data) {
      console.log("⚠️ No GitHub data returned.");
      return res.status(404).json({ message: "No data found" });
    }
    console.log("✅ GitHub data fetched successfully");
    return res.json(response.data);
  } catch (error) {
    console.error("❌ GitHub API error:", error.message);
    return res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});

// ✅ LeetCode Stats Proxy
app.get("/lc/:lcUsername", async (req, res) => {
  const lcUsername = req.params.lcUsername;
  console.log(`🟡 LeetCode route hit for user: ${lcUsername}`);
  try {
    const response = await axios.get(`https://leetcode-api-pied.vercel.app/user/${lcUsername}`);
    if (!response.data) {
      console.log("⚠️ No LeetCode data returned.");
      return res.status(404).json({ message: "LeetCode data not found" });
    }
    console.log("✅ LeetCode data fetched successfully");
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ LeetCode fetch error:", error.message);
    return res.status(500).json({ message: "Failed to fetch LeetCode data" });
  }
});

// API Routes
app.use("/api", authRoutes);
app.use("/review", reviewRoutes);
app.use("/users", userRoutes);

app.get("/api/protect-route", verifyToken, (req, res) => {
  console.log("🔒 Protected route accessed");
  return res.json({ isLoggedin: true, user: req.user });
});

// ⚠️ Wildcard fallback to serve frontend (MUST BE LAST)
app.get("/*any", (req, res) => {
  console.log(`🌐 Fallback route hit: ${req.originalUrl}`);
  res.sendFile(path.join(__dirname, "../Front-End/dist/index.html"));
});

// MongoDB Connection
mongoose.connect("mongodb+srv://vmusix01:DJGDlcor1PfyFmFA@devpro.kv2bcjm.mongodb.net/?retryWrites=true&w=majority&appName=devpro")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000...");
});
