import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();

// ---------- FIXED CORS FOR RENDER + VERCEL ----------
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://emi-marketplace.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/products", productRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Server running on " + PORT));
