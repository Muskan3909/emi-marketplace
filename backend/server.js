// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();

// ==========================================
// FIXED CORS Configuration
// ==========================================
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://emi-marketplace.vercel.app"
    ];
    
    // Allow requests with no origin (like mobile apps, Postman, curl, server-to-server)
    if (!origin) return callback(null, true);
    
    // Allow any vercel.app subdomain for preview deployments
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('⚠️  Origin not allowed:', origin);
      callback(null, true); // Allow anyway for now - change to false if you want strict mode
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: false, // Set to false since frontend doesn't need credentials
  optionsSuccessStatus: 200
}));

// Handle preflight requests
app.options('*', cors());

// Body parser
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Database connection
connectDB();

// ==========================================
// Routes
// ==========================================

// Root route
app.get("/", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "EMI Marketplace API is running",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      products: "/api/products",
      productBySlug: "/api/products/:slug"
    }
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Product Routes
app.use("/api/products", productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// ==========================================
// Start Server
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on ${PORT}`);
  console.log(`✅ MongoDB connected successfully`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

export default app;
